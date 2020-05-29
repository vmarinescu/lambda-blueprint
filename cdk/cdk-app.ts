import * as cdk from "@aws-cdk/core";
import { CustomerStack } from "../domains/customer/customer-stack";
import { HandoverStack } from "../domains/handover/handover-stack";
import { ApigatewayStack } from "./apigateway-stack";

const app = new cdk.App({});
const ENV = app.node.tryGetContext("ENV");

const apigatewayStack = new ApigatewayStack(app, `${ENV}-apigateway-stack`);

new CustomerStack(app, `${ENV}-customer-stack`, { restApi: apigatewayStack.restApi });
new HandoverStack(app, `${ENV}-handover-stack`, { restApi: apigatewayStack.restApi });
