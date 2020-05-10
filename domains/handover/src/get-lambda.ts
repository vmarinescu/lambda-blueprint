import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CorsReqHeader, withCors, handleError, buildResponse, Repository } from "@serverless-blueprint/core";
import { Service } from "./service";

export async function entrypoint(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  console.debug("Received event: %s", event);

  const id = event.pathParameters!["id"];

  const repository = new Repository();
  const service    = new Service(repository);

  return service
    .getHandover(id)
    .then ((handoverDto) => buildResponse(200, handoverDto))
    .catch((reason) => handleError(reason))
    .then ((result) =>
      withCors(
        result,
        event.headers[CorsReqHeader.ORIGIN]
      )
    );
}
