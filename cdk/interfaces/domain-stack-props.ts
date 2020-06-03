import * as apigateway from "@aws-cdk/aws-apigateway";
import { SharedStackProps } from "./shared-stack-props";

export interface DomainStackProps extends SharedStackProps {
  restApi: apigateway.RestApi;
}
