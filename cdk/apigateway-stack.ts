import * as apigateway from "@aws-cdk/aws-apigateway";
import * as cdk from "@aws-cdk/core";

export class ApigatewayStack extends cdk.Stack {
  public restApi: apigateway.RestApi;

  constructor(scope: cdk.App, env: string) {
    super(scope, `${env}-apigateway-stack`);
    // ...
    this.restApi = new apigateway.RestApi(this, `${env}-API`);
  }
}
