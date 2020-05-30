import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { isRight } from "fp-ts/lib/Either";
import { CrudRepository, decrypt, handleError } from "@serverless-blueprint/core";
import { CreateDto } from "./dtos/create-dto";
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

  const body = event.body;
  if (body == null) { return { statusCode: 400, body: "" }; }

  try {
    const createDto = JSON.parse(body);
    const either = CreateDto.decode(createDto); // ---> Unknown props will be stripped.
    if (isRight(either)) {
      const customerDto = await service.createCustomer(either.right);
      return { statusCode: 201, body: JSON.stringify(customerDto) };
    } else {
      return { statusCode: 400, body: "" };
    }
  } catch (error) {
    return handleError(error);
    // Todo
  }
}
