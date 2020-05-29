import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { isRight } from "fp-ts/lib/Either";
import { CrudRepository } from "@serverless-blueprint/core";
import { UpdateDto } from "./dtos/update-dto";
import { Customer } from "./entities/customer";
import { Service } from "./service";

const tableName  = process.env.TABLE_NAME!;
const repository = new CrudRepository<Customer>({ tableName: tableName });
const service    = new Service(repository);

export async function entrypoint(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  console.debug("Received customer-event: %s", event);

  const pathParameters = event.pathParameters;
  const body           = event.body;

  if (pathParameters == null || body == null) { return { statusCode: 400, body: "" }; }

  const updateDto = JSON.parse(body);
  try {
    const either = UpdateDto.decode(updateDto); // ---> Unknown props will be stripped.
    if (isRight(either)) {
      const id = pathParameters["id"];
      const customerDto = await service.updateCustomer(id, either.right);
      return {
        statusCode: 200,
        body:       JSON.stringify(customerDto),
      };
    } else {
      return {
        statusCode: 400,
        body:       "", // Todo: Send The reasons To our Consumers here?
      };
    }
  } catch (reason) {
    console.debug(reason);
    return { statusCode: 500, body: "" };
    // Todo: ...
  }
}
