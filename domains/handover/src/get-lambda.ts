import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CorsReqHeader, withCors, getEnv, Key as CoreKey, handleError, buildResponse, Repository } from "@serverless-blueprint/core";
import { Keys } from "./keys";
import { Service } from "./service";

export async function entrypoint(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  console.debug("Received event: %s", event);

  const id = event.pathParameters!["id"];

  const dynamoDBEndpoint = getEnv<string>(CoreKey.DYNAMODB_ENDPOINT);

  const handoverTable  = getEnv<string>(Keys.HANDOVER_TABLE, { required: true })!;
  const allowedOrigins = getEnv<string[]>(CoreKey.ALLOWED_ORIGINS) || [];

  const repository = new Repository(handoverTable, dynamoDBEndpoint);
  const service    = new Service(repository);

  return service
    .getHandover(id)
    .then ((handoverDto) => buildResponse(200, handoverDto))
    .catch((reason) => handleError(reason))
    .then ((result) =>
      withCors(
        result,
        event.headers[CorsReqHeader.ORIGIN],
        allowedOrigins,
      )
    );
}
