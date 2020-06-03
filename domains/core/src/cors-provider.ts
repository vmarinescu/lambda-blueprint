import { APIGatewayProxyResult } from "aws-lambda";

export const enum CorsResHeader {}

export const enum CorsReqHeader {}

export const withCors = (
  result: APIGatewayProxyResult,
  origin: string,
): APIGatewayProxyResult => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS as any || []; // Todo
  // tslint:disable-next-line:no-empty
  if (allowedOrigins.includes(origin)) {}
  // tslint:disable-next-line:no-empty
  else {}
  console.debug(result);
  return result;
};
