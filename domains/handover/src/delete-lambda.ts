import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CrudRepository, decrypt, handleError } from "@serverless-blueprint/core";
import { Handover } from "./entities/handover";
import { Service } from "./service";
import { Keys } from "./keys";

// @ts-ignore // Todo?
(async () => { process.env = await decrypt(process.env); })();

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
    await service.deleteHandover(pathParameters["id"]);
    return { statusCode: 204, body: "" };
  } catch (error) {
    return handleError(error);
    // Todo
  }
}
