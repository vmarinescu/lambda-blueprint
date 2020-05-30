import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CrudRepository, handleError } from "@serverless-blueprint/core";
import { Handover } from "./entities/handover";
import { Service } from "./service";
import { Keys } from "./keys";

const tableName  = process.env[Keys.TABLE_NAME] || "";
const repository = new CrudRepository<Handover>({ tableName: tableName });

// Initialize service outside of entrypoint to keep http-connection alive.
const service = new Service(repository);

export async function entrypoint(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  console.debug("Received handover-event: %s", event);

  const pathParameters = event.pathParameters;
  if (pathParameters == null) { return { statusCode: 400, body: "" }; }

  try {
    const handoverDto = await service.getHandover(pathParameters["id"]);
    return { statusCode: 200, body: JSON.stringify(handoverDto) };
  } catch (error) {
    return handleError(error);
    // Todo
  }
}
