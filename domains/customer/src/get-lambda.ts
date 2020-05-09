import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CorsReqHeader, withCors, handleError, buildResponse } from "@serverless-blueprint/core";
import { Service } from "./service";

export async function entrypoint(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  console.debug("Received event: %s", event);

  const id = event.pathParameters!["id"];
  const service = new Service();

  return service
    .getCustomer(id)
    .then ((dto) => buildResponse(200, dto))
    .catch((reason) => handleError(reason))
    .then ((result) => withCors(result, event.headers[CorsReqHeader.ORIGIN]));
}
