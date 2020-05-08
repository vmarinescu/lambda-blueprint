import { APIGatewayProxyResult } from "aws-lambda";
import { CorsResHeader, withCors } from "../../src/cors-provider";
import { Key } from "../../src/envs-provider";

const originFoo = "https://foo.example.com";
const originBar = "https://bar.example.com";

process.env[Key.ALLOWED_ORIGINS] = JSON.stringify([originFoo]);

describe("cors-provider", () => {
  it("should allow origin when origin is configured", () => {
    const result: APIGatewayProxyResult = {
      statusCode: 200,
      body: "",
    };
    expect(withCors(result, originFoo)).toEqual({
      statusCode: result.statusCode,
      headers: {
        [CorsResHeader.ACCESS_CONTROL_ALLOW_ORIGIN]: originFoo,
      },
      body: result.body,
    });
  });

  it("should block origin when origin is not configured", () => {
    const result: APIGatewayProxyResult = {
      statusCode: 200,
      body: "",
    };
    expect(withCors(result, originBar)).toEqual({
      statusCode: result.statusCode,
      body: result.body,
    });
  });
});
