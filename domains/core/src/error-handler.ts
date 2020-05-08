import { APIGatewayProxyResult } from "aws-lambda";
import { Error400 } from "./errors/error-400";
import { Error404 } from "./errors/error-404";
import { toApiGatewayProxyResult } from "./response-handler";

export function handleCreateError(error: Error): APIGatewayProxyResult {
  return error.constructor === Error400
    ? toApiGatewayProxyResult(400)
    : toApiGatewayProxyResult(500);
}

export function handleGetError(error: Error): APIGatewayProxyResult {
  return error.constructor === Error404
    ? toApiGatewayProxyResult(404)
    : toApiGatewayProxyResult(500);
}
