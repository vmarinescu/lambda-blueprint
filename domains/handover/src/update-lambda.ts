import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { isRight } from "fp-ts/lib/Either";
import { handleError } from "@serverless-blueprint/core";
import { UpdateDto } from "./dtos/update-dto";
import { createService } from "./utils/service-factory";
import { Service } from "./utils/service";

// Keep outside to re-use it for subsequent invocations.
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
    const either = UpdateDto.decode(updateDto); // ---> Unknown props stripped.
    if (isRight(either)) {
      const id = pathParameters["id"];
      const handoverDto = await service.updateHandover(id, either.right);
      return { statusCode: 200, body: JSON.stringify(handoverDto) };
    } else {
      return { statusCode: 400, body: "" };
    }
  } catch (error) {
    return handleError(error);
    // Todo
  }
}
