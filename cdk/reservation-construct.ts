import cdk = require("@aws-cdk/core");
import { CoreProps } from "./core-construct";

export class ReservationConstruct extends cdk.Construct {
  constructor(scope: cdk.Stack, env: string, props: CoreProps) {
    super(scope, `${env}-Reservation-Construct`);

    if (!props.restApi) {
      throw Error("REST-API is missing.");
    }
  }
}
