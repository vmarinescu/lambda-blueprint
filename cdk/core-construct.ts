import apigateway = require("@aws-cdk/aws-apigateway");
import cdk = require("@aws-cdk/core");

export interface CoreProps {
  restApi: apigateway.RestApi;
}

export class CoreConstruct extends cdk.Construct {
  restApi: apigateway.RestApi;

  constructor(scope: cdk.Stack, env: string) {
    super(scope, `${env}-Core-Construct`);

    this.restApi = new apigateway.RestApi(scope, `${env}-Foo-API`, {});
    const apiKey = this.restApi.addApiKey(`${env}-API-Key`);

    this.restApi.addUsagePlan(`${env}-Usage-Plan`, {
      apiKey: apiKey,
      apiStages: [{
        stage: this.restApi.deploymentStage,
      }],
      // Throttle to lambda-limits.
      throttle: {
        rateLimit:  1000,
        burstLimit: 1000,
      },
    });
  }
}
