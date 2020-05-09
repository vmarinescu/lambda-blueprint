import { APIGatewayProxyResult } from "aws-lambda";
import { Error400 } from "./errors/error-400";
import { Error404 } from "./errors/error-404";
import { buildResponse } from "./response-builder";

export function handleError(error: Error): APIGatewayProxyResult {
  if (error.constructor === Error400)
    return buildResponse(400);
  if (error.constructor === Error404)
    return buildResponse(404);

  return buildResponse(500);
}
