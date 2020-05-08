import cdk = require("@aws-cdk/core");
import { CoreProps } from "./core-construct";

export class CustomerConstruct extends cdk.Construct {
  constructor(scope: cdk.Stack, env: string, props: CoreProps) {
    super(scope, `${env}-Customer-Construct`);

    if (!props.restApi) {
      throw Error("REST-API is missing.");
    }
  }
}
