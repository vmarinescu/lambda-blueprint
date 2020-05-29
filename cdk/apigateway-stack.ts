import * as apigateway from "@aws-cdk/aws-apigateway";
import * as cdk from "@aws-cdk/core";

export class ApigatewayStack extends cdk.Stack {
  public restApi: apigateway.RestApi;

  constructor(scope: cdk.App, id: string) {
    super(scope, id);
    // ...
    this.restApi = new apigateway.RestApi(this, "Test-API", {});

    this.restApi.root.addCorsPreflight({
      allowOrigins: [],
      allowMethods: [],
    });
  }
}
