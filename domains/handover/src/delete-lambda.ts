import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { handleError } from "@serverless-blueprint/core";
import { createService } from "./service-factory";
import { Service } from "./service";

let service: Service;

export async function entrypoint(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  console.debug("Received handover-event: %s", event);
  try {
    const pathParameters = event.pathParameters;
    if (pathParameters == null) { return { statusCode: 400, body: "" }; }

    if (!service) { service = await createService(); }

    await service.deleteHandover(pathParameters["id"]);
    return { statusCode: 204, body: "" };
  } catch (error) {
    return handleError(error);
    // Todo
  }
}
