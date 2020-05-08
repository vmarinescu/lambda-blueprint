import apigateway = require("@aws-cdk/aws-apigateway");
import cdk = require("@aws-cdk/core");

export interface CoreProps {
  restApi: apigateway.RestApi;
}

export class CoreConstruct extends cdk.Construct {
  restApi: apigateway.RestApi;

  constructor(scope: cdk.Stack, env: string) {
    super(scope, `${env}-Core-Construct`);

    this.restApi = new apigateway.RestApi(scope, `${env}-Foo-API`, {});
  }
}
