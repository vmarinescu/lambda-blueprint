import { toApiGatewayProxyResult } from "../../src/response-handler";

describe("response-builder", () => {
  it("should build APIGatewayProxyResult when statusCode is provided", () => {
    expect(toApiGatewayProxyResult(200)).toEqual({
      statusCode: 200,
      body: "",
    });
  });

  it("should build APIGatewayProxyResult when statusCode and body are provided", () => {
    const body = { foo: "bar" };
    expect(toApiGatewayProxyResult(200, body)).toEqual({
      statusCode: 200,
      body: JSON.stringify(body),
    });
  });
});
