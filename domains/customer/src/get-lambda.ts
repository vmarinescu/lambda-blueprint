import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CorsReqHeader, withCors, handleGetError, toApiGatewayProxyResult } from "@serverless-blueprint/core";
import { Service } from "./service";

export async function entrypoint(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  console.debug("Received event: %s", event);

  const id = event.pathParameters!["id"];
  const service = new Service();

  return service
    .getCustomer(id)
    .then ((dto) => toApiGatewayProxyResult(200, dto))
    .catch((reason) => handleGetError(reason))
    .then ((result) => withCors(result, event.headers[CorsReqHeader.ORIGIN]));
}
