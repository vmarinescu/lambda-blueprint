import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { isRight } from "fp-ts/lib/Either";
import { handleError } from "@serverless-blueprint/core";
import { CreateDto } from "./dtos/create-dto";
import { createService } from "./utils/service-factory";
import { Service } from "./utils/service";

let service: Service;

export async function entrypoint(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  console.debug("Received customer-event: %s", event);
  try {
    const body = event.body;
    if (body == null) { return { statusCode: 400, body: "" }; }

    if (!service) { service = await createService(); }
    const createDto = JSON.parse(body);
    const either = CreateDto.decode(createDto); // ---> Unknown props stripped.
    if (isRight(either)) {
      const id = await service.createCustomer(either.right);
      const headers = { Location: `.../customers/${id}` }; // Todo
      return { statusCode: 201, body: "", headers };
    } else {
      return { statusCode: 400, body: "" };
    }
  } catch (error) {
    return handleError(error);
    // Todo
  }
}
