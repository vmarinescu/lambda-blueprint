import { APIGatewayProxyResult } from "aws-lambda";

export const enum CorsResHeader {
  ACCESS_CONTROL_ALLOW_ORIGIN = "Access-Control-Allow-Origin",
}

export const enum CorsReqHeader {
  ORIGIN = "Origin",
}

export function withCors(
  result: APIGatewayProxyResult,
  origin: string,
  allowedOrigins: string[],
): APIGatewayProxyResult {
  if (allowedOrigins.includes(origin)) {
    result.headers = result.headers || {};
    result.headers[CorsResHeader.ACCESS_CONTROL_ALLOW_ORIGIN] = origin;
  }
  console.debug(result);
  return result;
}
