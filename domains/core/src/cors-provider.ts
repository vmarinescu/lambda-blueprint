import { APIGatewayProxyResult } from "aws-lambda";
import { getEnv, Key } from "./envs-provider";

export const enum CorsResHeader {
  ACCESS_CONTROL_ALLOW_ORIGIN = "Access-Control-Allow-Origin",
}

export const enum CorsReqHeader {
  ORIGIN = "Origin",
}

export function withCors(
  result: APIGatewayProxyResult,
  origin: string
): APIGatewayProxyResult {
  const origins = getEnv<string[]>(Key.ALLOWED_ORIGINS);
  if (origins && origins.includes(origin)) {
    result.headers = result.headers || {};
    result.headers[CorsResHeader.ACCESS_CONTROL_ALLOW_ORIGIN] = origin;
  }
  console.debug(result);
  return result;
}
