import * as apigateway from "@aws-cdk/aws-apigateway";
import * as cdk from "@aws-cdk/core";
import { SharedStackProps } from "./interfaces/shared-stack-props";

export class ApigatewayStack extends cdk.Stack {
  public restApi: apigateway.RestApi;

  constructor(scope: cdk.App, props: SharedStackProps) {
    super(scope, `${props.Env}-apigateway-stack`, props);
    // ...
    this.restApi = new apigateway.RestApi(this, `${props.Env}-API`, {});
  }
}
