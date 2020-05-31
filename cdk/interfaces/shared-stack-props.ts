import * as cdk from "@aws-cdk/core";

export type NodeEnv = "qa" | "prod";

export interface SharedStackProps extends cdk.StackProps {
  nodeEnv: NodeEnv;
  // ...
}
