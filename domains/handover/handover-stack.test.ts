// https://docs.aws.amazon.com/cdk/latest/guide/testing.html

import * as cdk from "@aws-cdk/core";
import * as assert from "@aws-cdk/assert";

import { HandoverStack } from "./handover-stack";
import { ApigatewayStack } from "../../cdk/src/apigateway-stack";
import { SharedStackProps } from "../../cdk/src/interfaces/shared-stack-props";
import { DomainStackProps } from "../../cdk/src/interfaces/domain-stack-props";

describe("handover-stack", () => {
  it("test", async () => {
    const app = new cdk.App({});

    const sharedProps: SharedStackProps = { env: "local" };
    const apigatewayStack = new ApigatewayStack(app, sharedProps);

    const domainProps: DomainStackProps = { ...sharedProps, restApi: apigatewayStack.restApi }; // Todo: Mock?

    const handoverStack = new HandoverStack(app, domainProps, "dist");
    const cOutput = assert.SynthUtils.toCloudFormation(handoverStack);

    expect(cOutput).toMatchSnapshot();
  });
});
