import * as apigateway from "@aws-cdk/aws-apigateway";
import * as cdk from "@aws-cdk/core";
import { ApigatewayStack } from "./apigateway-stack";
import { CustomerStack } from "../domains/customer/customer-stack";
import { HandoverStack } from "../domains/handover/handover-stack";

export interface DomainStackProps extends cdk.StackProps {
  restApi: apigateway.RestApi;
  // ...
}

const app = new cdk.App();

const apigatewayStack = new ApigatewayStack(app, "Apigateway-Stack");

new CustomerStack(app, "Customer-Stack", { restApi: apigatewayStack.restApi });
new HandoverStack(app, "Handover-Stack", { restApi: apigatewayStack.restApi });