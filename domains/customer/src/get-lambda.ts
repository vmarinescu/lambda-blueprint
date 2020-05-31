import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { handleError } from "@serverless-blueprint/core";
import { createService } from "./service-factory";
import { Service } from "./service";

let service: Service;

export async function entrypoint(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  console.debug("Received customer-event: %s", event);
  try {
    const pathParameters = event.pathParameters;
    if (pathParameters == null) { return { statusCode: 400, body: "" }; }

    if (!service) { service = await createService(); }

    const customerDto = await service.getCustomer(pathParameters["id"]);
    return { statusCode: 200, body: JSON.stringify(customerDto) };
  } catch (error) {
    return handleError(error);
    // Todo
  }
}
