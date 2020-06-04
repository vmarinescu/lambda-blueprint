import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { handleError } from "@lambda-blueprint/core";
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
    if (pathParameters == null) { return { statusCode: 400, body: "" }; }
    if (!service) { service = await createService(); }
    const handoverDto = await service.getHandover(pathParameters.id);
    return { statusCode: 200, body: JSON.stringify(handoverDto) };
  } catch (error) {
    return handleError(error);
    // Todo
  }
}
