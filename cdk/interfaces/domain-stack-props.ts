import * as apigateway from "@aws-cdk/aws-apigateway";
import * as cdk from "@aws-cdk/core";

export interface DomainStackProps extends cdk.StackProps {
  restApi: apigateway.RestApi;
  // ...
}
