import cdk = require("@aws-cdk/core");
import { CoreConstruct } from "./core-construct";
import { CustomerConstruct } from "./customer-construct";
import { ReservationConstruct } from "./reservation-construct";

class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, env: string) {
    super(scope, `${env}-Cdk-Stack`);

    const coreConstruct = new CoreConstruct(this, env);

    new CustomerConstruct(this, env, { restApi: coreConstruct.restApi });
    new ReservationConstruct(this, env, { restApi: coreConstruct.restApi });
  }
}

const app = new cdk.App();
const ENV = app.node.tryGetContext("ENV");

new CdkStack(app, ENV);
