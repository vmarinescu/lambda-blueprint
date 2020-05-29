import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CrudRepository, handleError } from "@serverless-blueprint/core";
import { Handover } from "./entities/handover";
import { Service } from "./service";

const tableName  = process.env.TABLE_NAME || ""; // Todo
const repository = new CrudRepository<Handover>({ tableName: tableName });
const service    = new Service(repository);

export async function entrypoint(
  event: APIGatewayProxyEvent
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
