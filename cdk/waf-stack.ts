import * as apigateway from "@aws-cdk/aws-apigateway";
import * as wafv2 from "@aws-cdk/aws-wafv2";
import * as cdk from "@aws-cdk/core";

export class WafStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const testApi = new apigateway.RestApi(this, "Test-API", {
      endpointConfiguration: {
        types: [apigateway.EndpointType.REGIONAL],
      },
    });
    testApi.root.addMethod("GET", new apigateway.MockIntegration());

    const webAcl = new wafv2.CfnWebACL(this, "WebAcl", {
      defaultAction: { allow: {} },
      rules: [
        {
          priority: 1,
          overrideAction: { none: {} },
          visibilityConfig: {
            sampledRequestsEnabled:   true,
            cloudWatchMetricsEnabled: true,
            metricName: "AWS-AWSManagedRulesAmazonIpReputationList",
          },
          name: "AWS-AWSManagedRulesAmazonIpReputationList",
          statement: {
            managedRuleGroupStatement: {
              vendorName: "AWS",
              name: "AWSManagedRulesAmazonIpReputationList",
            },
          },
        },
        {
          priority: 2,
          overrideAction: { none: {} },
          visibilityConfig: {
            sampledRequestsEnabled:   true,
            cloudWatchMetricsEnabled: true,
            metricName: "AWS-AWSManagedRulesCommonRuleSet",
          },
          name: "AWS-AWSManagedRulesCommonRuleSet",
          statement: {
            managedRuleGroupStatement: {
              vendorName: "AWS",
              name: "AWSManagedRulesCommonRuleSet",
            },
          },
        },
        {
          priority: 3,
          overrideAction: { none: {} },
          visibilityConfig: {
            sampledRequestsEnabled:   true,
            cloudWatchMetricsEnabled: true,
            metricName: "AWS-AWSManagedRulesKnownBadInputsRuleSet",
          },
          name: "AWS-AWSManagedRulesKnownBadInputsRuleSet",
          statement: {
            managedRuleGroupStatement: {
              vendorName: "AWS",
              name: "AWSManagedRulesKnownBadInputsRuleSet",
            },
          },
        },
      ],
      scope: "REGIONAL",
      visibilityConfig: {
        sampledRequestsEnabled:   true,
        cloudWatchMetricsEnabled: true,
        metricName: "WebAcl",
      },
    });

    // See here: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafv2-webaclassociation.html#cfn-wafv2-webaclassociation-resourcearn
    const region = cdk.Stack.of(this).region;
    const arn = `arn:aws:apigateway:${region}::/restapis/${testApi.restApiId}/stages/${testApi.deploymentStage.stageName}`;

    new wafv2.CfnWebACLAssociation(this, "WebAclAssociation", {
      webAclArn:   webAcl.attrArn,
      resourceArn: arn,
    });
  }
}

const app = new cdk.App();
new WafStack(app, "Waf-Stack");
