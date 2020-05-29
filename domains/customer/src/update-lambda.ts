import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function entrypoint(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  console.debug("Received customer-event: %s", event);
  return { statusCode: 200, body: "" };
}
