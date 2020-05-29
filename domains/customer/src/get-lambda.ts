import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CrudRepository, handleError } from "@serverless-blueprint/core";
import { Customer } from "./entities/customer";
import { Service } from "./service";

const tableName  = process.env.TABLE_NAME || ""; // Todo
const repository = new CrudRepository<Customer>({ tableName: tableName });
const service    = new Service(repository);

export async function entrypoint(
  event: APIGatewayProxyEvent
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
