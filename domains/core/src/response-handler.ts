import { APIGatewayProxyResult } from "aws-lambda";

export function toApiGatewayProxyResult(
  statusCode: number,
  body?: any
): APIGatewayProxyResult {
  return {
    statusCode: statusCode,
    body: body ? JSON.stringify(body) : "",
  };
}
