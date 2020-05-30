import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { isRight } from "fp-ts/lib/Either";
import { CrudRepository, decrypt, handleError } from "@serverless-blueprint/core";
import { UpdateDto } from "./dtos/update-dto";
import { Customer } from "./entities/customer";
import { Service } from "./service";
import { Keys } from "./keys";

// @ts-ignore
process.env = decrypt(process.env); // Todo?

const tableName  = process.env[Keys.TABLE_NAME] || "";
const repository = new CrudRepository<Customer>({ tableName: tableName });

// Initialize service outside of entrypoint to keep http-connection alive.
const service = new Service(repository);

export async function entrypoint(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  console.debug("Received customer-event: %s", event);

  const pathParameters = event.pathParameters;
  const body           = event.body;

  if (pathParameters == null || body == null) { return { statusCode: 400, body: "" }; }

  try {
    const updateDto = JSON.parse(body);
    const either = UpdateDto.decode(updateDto); // ---> Unknown props will be stripped.
    if (isRight(either)) {
      await service.updateCustomer(pathParameters["id"], either.right);
      return { statusCode: 204, body: "" };
    } else {
      return { statusCode: 400, body: "" };
    }
  } catch (error) {
    return handleError(error);
    // Todo
  }
}
