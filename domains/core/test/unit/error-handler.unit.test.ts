import { Error400 } from "../../src/errors/error-400";
import { Error404 } from "../../src/errors/error-404";
import { handleError } from "../../src/error-handler";

describe("error-handler", () => {
  it("should return 400-Response when 400-Error was passed to error-handler", async () => {
    expect(handleError(new Error400())).toEqual({
      statusCode: 400,
      body: "",
    });
  });

  it("should return 404-Response when 404-Error was passed to error-handler", async () => {
    expect(handleError(new Error404())).toEqual({
      statusCode: 404,
      body: "",
    });
  });

  it("should return 500-Response when generic Error was passed to error-handler", async () => {
    expect(handleError(new Error())).toEqual({
      statusCode: 500,
      body: "",
    });
  });
});
