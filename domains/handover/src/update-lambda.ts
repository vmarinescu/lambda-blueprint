import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { isRight } from "fp-ts/lib/Either";
import { handleError } from "@serverless-blueprint/core";
import { UpdateDto } from "./dtos/update-dto";
import { createService } from "./utils/service-factory";
import { Service } from "./utils/service";

let service: Service;

export async function entrypoint(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  console.debug("Received handover-event: %s", event);
  try {
    const pathParameters = event.pathParameters;
    const body           = event.body;

    if (pathParameters == null || body == null) { return { statusCode: 400, body: "" }; }

    if (!service) { service = await createService(); }

    const updateDto = JSON.parse(body);
    const either = UpdateDto.decode(updateDto); // ---> Unknown props will be stripped.
    if (isRight(either)) {
      await service.updateHandover(pathParameters["id"], either.right);
      return { statusCode: 204, body: "" };
    } else {
      return { statusCode: 400, body: "" };
    }
  } catch (error) {
    return handleError(error);
    // Todo
  }
}
