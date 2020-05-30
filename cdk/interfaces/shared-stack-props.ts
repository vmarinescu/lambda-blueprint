import * as cdk from "@aws-cdk/core";

export type Env = "qa" | "prod";

export interface SharedStackProps extends cdk.StackProps {
  Env: Env;
  // ...
}
