import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CrudRepository, handleError } from "@serverless-blueprint/core";
import { Customer } from "./entities/customer";
import { Service } from "./service";
import { Keys } from "./keys";

const tableName  = process.env[Keys.TABLE_NAME] || "";
const repository = new CrudRepository<Customer>({ tableName: tableName });

// Initialize service outside of entrypoint to keep http-connection alive.
const service = new Service(repository);

export async function entrypoint(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  console.debug("Received customer-event: %s", event);

  const pathParameters = event.pathParameters;
  if (pathParameters == null) { return { statusCode: 400, body: "" }; }

  try {
    await service.deleteCustomer(pathParameters["id"]);
    return { statusCode: 204, body: "" };
  } catch (error) {
    return handleError(error);
    // Todo
  }
}
