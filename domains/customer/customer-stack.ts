import * as apigateway from "@aws-cdk/aws-apigateway";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import * as iam from "@aws-cdk/aws-iam";
import * as cdk from "@aws-cdk/core";
import { DomainStackProps } from "../../cdk/interfaces/domain-stack-props";
import { Keys } from "./src/utils/keys";

export class CustomerStack extends cdk.Stack {
  constructor(scope: cdk.App, props: DomainStackProps) {
    super(scope, `${props.env}-customer-stack`);

    const restApi = props.restApi;

    const dynamodbTable = new dynamodb.Table(this, "customers", {
      tableName: `${props.env}-customers`,
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });

    const environment: Record<string, string> = {};

    environment[Keys.ENV]        = props.env;
    environment[Keys.TABLE_NAME] = dynamodbTable.tableName;
    // ...

    // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/node-reusing-connections.html
    environment["AWS_NODEJS_CONNECTION_REUSE_ENABLED"] = "1";
    // ...

    // Todo: build ssm-role and attach it ...

    const createLambda = new lambda.Function(this, "createLambda", {
      handler: "create-lambda-bundle.entrypoint",
      runtime: lambda.Runtime.NODEJS_12_X,
      code:    lambda.AssetCode.fromAsset(
        "domains/customer/dist",
        { exclude: ["**", "!create-lambda-bundle.js"] },
      ),
      environment,
    });

    const deleteLambda = new lambda.Function(this, "deleteLambda", {
      handler: "delete-lambda-bundle.entrypoint",
      runtime: lambda.Runtime.NODEJS_12_X,
      code:    lambda.AssetCode.fromAsset(
        "domains/customer/dist",
        { exclude: ["**", "!delete-lambda-bundle.js"] },
      ),
      environment,
    });

    const getLambda = new lambda.Function(this, "getLambda", {
      handler: "get-lambda-bundle.entrypoint",
      runtime: lambda.Runtime.NODEJS_12_X,
      code:    lambda.AssetCode.fromAsset(
        "domains/customer/dist",
        { exclude: ["**", "!get-lambda-bundle.js"] },
      ),
      environment,
    });

    const updateLambda = new lambda.Function(this, "updateLambda", {
      handler: "update-lambda-bundle.entrypoint",
      runtime: lambda.Runtime.NODEJS_12_X,
      code:    lambda.AssetCode.fromAsset(
        "domains/customer/dist",
        { exclude: ["**", "!update-lambda-bundle.js"] },
      ),
      environment,
    });

    dynamodbTable.grantWriteData(createLambda);
    dynamodbTable.grantWriteData(deleteLambda);
    dynamodbTable.grantReadData(getLambda);
    dynamodbTable.grantWriteData(updateLambda);

    const customers = restApi.root.addResource("customers");

    const createIntegration = new apigateway.LambdaIntegration(createLambda);
    customers.addMethod("POST", createIntegration);

    const customer = customers.addResource("{id}");

    const deleteIntegration = new apigateway.LambdaIntegration(deleteLambda);
    customer.addMethod("DELETE", deleteIntegration);

    const getIntegration = new apigateway.LambdaIntegration(getLambda);
    customer.addMethod("GET", getIntegration);

    const updateIntegration = new apigateway.LambdaIntegration(updateLambda);
    customer.addMethod("PUT", updateIntegration);

    customers.addCorsPreflight({
      allowOrigins: apigateway.Cors.ALL_ORIGINS, // <--- Todo: Restrict?
      allowMethods: ["POST"],
    });
    customer.addCorsPreflight({
      allowOrigins: apigateway.Cors.ALL_ORIGINS, // <--- Todo: Restrict?
      allowMethods: ["DELETE, GET, PUT"],
    });
  }
}
