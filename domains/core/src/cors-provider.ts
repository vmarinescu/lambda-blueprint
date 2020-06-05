import { APIGatewayProxyResult } from "aws-lambda";

export const enum CorsReqHeader {}

export const enum CorsResHeader {}

export const withCors = (
  result: APIGatewayProxyResult,
  origin: string,
  allowedOrigins: string[],
): APIGatewayProxyResult => {
  if (allowedOrigins.includes(origin)) {}
  else {}
  console.debug(result);
  return result;
};
