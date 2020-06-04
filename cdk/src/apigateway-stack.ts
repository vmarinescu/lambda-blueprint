import * as apigateway from "@aws-cdk/aws-apigateway";
import * as cdk from "@aws-cdk/core";
import { SharedStackProps } from "./interfaces/shared-stack-props";

export class ApigatewayStack extends cdk.Stack {
  restApi: apigateway.RestApi;

  constructor(scope: cdk.App, props: SharedStackProps) {
    super(scope, `${props.env}-apigateway-stack`);
    this.restApi = new apigateway.RestApi(this, `${props.env}-API`, {});
    // ...
  }
}
