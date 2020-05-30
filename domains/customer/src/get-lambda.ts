import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CrudRepository, decrypt, handleError } from "@serverless-blueprint/core";
import { Customer } from "./entities/customer";
import { Service } from "./service";
import { Keys } from "./keys";

// @ts-ignore // Todo?
(async () => { process.env = await decrypt(process.env); })();

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
    const customerDto = await service.getCustomer(pathParameters["id"]);
    return { statusCode: 200, body: JSON.stringify(customerDto) };
  } catch (error) {
    return handleError(error);
    // Todo
  }
}
