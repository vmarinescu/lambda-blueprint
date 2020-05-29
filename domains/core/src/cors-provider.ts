import { APIGatewayProxyResult } from "aws-lambda";

export const enum CorsResHeader {}

export const enum CorsReqHeader {}

export function withCors(
  result: APIGatewayProxyResult,
  origin: string,
): APIGatewayProxyResult {
  const allowedOrigins = process.env.ALLOWED_ORIGINS as any || []; // Todo
  if (allowedOrigins.includes(origin)) {}
  // ...
  console.debug(result);
  return result;
}
