import * as cdk from "@aws-cdk/core";

export type Stage = "qa" | "prod";

export interface SharedStackProps extends cdk.StackProps {
  stage: Stage;
  // ...
}
