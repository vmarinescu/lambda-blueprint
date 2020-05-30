import * as cdk from "@aws-cdk/core";
import { CustomerStack } from "../domains/customer/customer-stack";
import { HandoverStack } from "../domains/handover/handover-stack";
import { ApigatewayStack } from "./apigateway-stack";

const app = new cdk.App({});
const env = app.node.tryGetContext("ENV");

const apigatewayStack = new ApigatewayStack(app, env);

new CustomerStack(app, env, { restApi: apigatewayStack.restApi });
new HandoverStack(app, env, { restApi: apigatewayStack.restApi });
