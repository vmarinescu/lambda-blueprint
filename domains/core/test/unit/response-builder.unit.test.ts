import { buildResponse } from "../../src/response-builder";

describe("response-builder", () => {
  it("should build APIGatewayProxyResult when statusCode is provided", () => {
    expect(buildResponse(200)).toEqual({
      statusCode: 200,
      body: "",
    });
  });

  it("should build APIGatewayProxyResult when statusCode and body are provided", () => {
    const body = { foo: "bar" };
    expect(buildResponse(200, body)).toEqual({
      statusCode: 200,
      body: JSON.stringify(body),
    });
  });
});
