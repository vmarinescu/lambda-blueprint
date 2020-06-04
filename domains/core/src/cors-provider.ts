import { APIGatewayProxyResult } from "aws-lambda";
import { getEnvVar, Keys } from "./envs-provider";

export const enum CorsReqHeader {}

export const enum CorsResHeader {}

export const withCors = (
  result: APIGatewayProxyResult,
  origin: string,
): APIGatewayProxyResult => {
  const allowedOrigins = getEnvVar<string[]>(Keys.ALLOWED_ORIGINS) || []; // Todo
  if (allowedOrigins.includes(origin)) {}
  else {}
  console.debug(result);
  return result;
};
