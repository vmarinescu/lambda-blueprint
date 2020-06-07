// https://docs.aws.amazon.com/cdk/latest/guide/testing.html

import * as cdk from "@aws-cdk/core";
import * as assert from "@aws-cdk/assert";

import { CustomerStack } from "./customer-stack";
import { ApigatewayStack } from "../../cdk/src/apigateway-stack";
import { SharedStackProps } from "../../cdk/src/interfaces/shared-stack-props";
import { DomainStackProps } from "../../cdk/src/interfaces/domain-stack-props";

describe("customer-stack", () => {
  it("test", async () => {
    const app = new cdk.App({});
    const sharedProps: SharedStackProps = { env: "local" };
    const apigatewayStack = new ApigatewayStack(app, sharedProps);
    const domainProps: DomainStackProps = { ...sharedProps, restApi: apigatewayStack.restApi }; // Todo: Mock?
    const stack = new CustomerStack(app, domainProps, "dist");
    expect(assert.SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});
