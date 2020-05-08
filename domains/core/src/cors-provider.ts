import { APIGatewayProxyResult } from "aws-lambda";
import { getEnv, Key } from "./envs-provider";

export enum CorsResHeader {
  ACCESS_CONTROL_ALLOW_ORIGIN = "Access-Control-Allow-Origin",
}

export enum CorsReqHeader {
  ORIGIN = "Origin",
}

export function withCors(
  result: APIGatewayProxyResult,
  origin: string
): APIGatewayProxyResult {
  const origins = getEnv<string[]>(Key.ALLOWED_ORIGINS, { required: true })!;
  if (origins.indexOf(origin) > -1) {
    result.headers = result.headers || {};
    result.headers[CorsResHeader.ACCESS_CONTROL_ALLOW_ORIGIN] = origin;
  }
  console.debug(result);
  return result;
}
