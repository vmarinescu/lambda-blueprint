import * as apigateway from "@aws-cdk/aws-apigateway";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import * as iam from "@aws-cdk/aws-iam";
import * as cdk from "@aws-cdk/core";
import { DomainStackProps } from "../../cdk/src/interfaces/domain-stack-props";
import { Keys } from "./src/utils/keys";

export class HandoverStack extends cdk.Stack {
  constructor(scope: cdk.App, props: DomainStackProps, path: string) {
    super(scope, `${props.env}-handover-stack`);

    const restApi = props.restApi;

    const dynamodbTable = new dynamodb.Table(this, "handovers", {
      tableName: `${props.env}-handovers`,
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });

    const environment: Record<string, string> = {};

    environment[Keys.ENV]        = props.env;
    environment[Keys.TABLE_NAME] = dynamodbTable.tableName;
    // ...

    // Todo: build ssm-role and attach it ...

    const createLambda = new lambda.Function(this, "createLambda", {
      handler: "create-lambda-bundle.entrypoint",
      runtime: lambda.Runtime.NODEJS_12_X,
      code:    lambda.AssetCode.fromAsset(
        path,
        { exclude: ["**", "!create-lambda-bundle.js"] },
      ),
      environment,
    });

    const deleteLambda = new lambda.Function(this, "deleteLambda", {
      handler: "delete-lambda-bundle.entrypoint",
      runtime: lambda.Runtime.NODEJS_12_X,
      code:    lambda.AssetCode.fromAsset(
        path,
        { exclude: ["**", "!delete-lambda-bundle.js"] },
      ),
      environment,
    });

    const getLambda = new lambda.Function(this, "getLambda", {
      handler: "get-lambda-bundle.entrypoint",
      runtime: lambda.Runtime.NODEJS_12_X,
      code:    lambda.AssetCode.fromAsset(
        path,
        { exclude: ["**", "!get-lambda-bundle.js"] },
      ),
      environment,
    });

    const updateLambda = new lambda.Function(this, "updateLambda", {
      handler: "update-lambda-bundle.entrypoint",
      runtime: lambda.Runtime.NODEJS_12_X,
      code:    lambda.AssetCode.fromAsset(
        path,
        { exclude: ["**", "!update-lambda-bundle.js"] },
      ),
      environment,
    });

    dynamodbTable.grantWriteData(createLambda);
    dynamodbTable.grantWriteData(deleteLambda);
    dynamodbTable.grantReadData(getLambda);
    dynamodbTable.grantReadWriteData(updateLambda);

    const handovers = restApi.root.addResource("handovers");

    const createIntegration = new apigateway.LambdaIntegration(createLambda);
    handovers.addMethod("POST", createIntegration);

    const handover = handovers.addResource("{id}");

    const deleteIntegration = new apigateway.LambdaIntegration(deleteLambda);
    handover.addMethod("DELETE", deleteIntegration);

    const getIntegration = new apigateway.LambdaIntegration(getLambda);
    handover.addMethod("GET", getIntegration);

    const updateIntegration = new apigateway.LambdaIntegration(updateLambda);
    handover.addMethod("PUT", updateIntegration);

    handovers.addCorsPreflight({
      allowOrigins: apigateway.Cors.ALL_ORIGINS, // <--- Todo: Restrict?
      allowMethods: ["POST"],
    });
    handover.addCorsPreflight({
      allowOrigins: apigateway.Cors.ALL_ORIGINS, // <--- Todo: Restrict?
      allowMethods: ["DELETE, GET, PUT"],
    });
  }
}
