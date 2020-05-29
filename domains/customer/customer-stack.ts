import * as apigateway from "@aws-cdk/aws-apigateway";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";
import { DomainStackProps } from "../../cdk/interfaces/domain-stack-props";

export class CustomerStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: DomainStackProps) {
    super(scope, id, props);

    const restApi = props.restApi;

    const dynamoTable = new dynamodb.Table(this, "customers", {
      tableName: "customers",
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });

    const createLambda = new lambda.Function(this, "createLambda", {
      code:    lambda.AssetCode.fromAsset("domains/customer/dist", { exclude: ["**", "!create-lambda-bundle.js"] }),
      handler: "create-lambda-bundle.entrypoint",
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TABLE_NAME: dynamoTable.tableName,
      }
    });

    const deleteLambda = new lambda.Function(this, "deleteLambda", {
      code:    lambda.AssetCode.fromAsset("domains/customer/dist", { exclude: ["**", "!delete-lambda-bundle.js"] }),
      handler: "delete-lambda-bundle.entrypoint",
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TABLE_NAME: dynamoTable.tableName,
      }
    });

    const getLambda = new lambda.Function(this, "getLambda", {
      code:    lambda.AssetCode.fromAsset("domains/customer/dist", { exclude: ["**", "!get-lambda-bundle.js"] }),
      handler: "get-lambda-bundle.entrypoint",
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TABLE_NAME: dynamoTable.tableName,
      }
    });

    const updateLambda = new lambda.Function(this, "updateLambda", {
      code:    lambda.AssetCode.fromAsset("domains/customer/dist", { exclude: ["**", "!update-lambda-bundle.js"] }),
      handler: "update-lambda-bundle.entrypoint",
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TABLE_NAME: dynamoTable.tableName,
      }
    });

    dynamoTable.grantWriteData(createLambda);
    dynamoTable.grantWriteData(deleteLambda);
    dynamoTable.grantReadData(getLambda);
    dynamoTable.grantWriteData(updateLambda);

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
