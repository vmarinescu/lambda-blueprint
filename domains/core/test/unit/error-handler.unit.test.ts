import { Error400 } from "../../src/errors/error-400";
import { Error404 } from "../../src/errors/error-404";
import { handleCreateError, handleGetError } from "../../src/error-handler";

describe("error-handler", () => {
  it("should return 400 when 400-Error was passed to create-handler", async () => {
    expect(handleCreateError(new Error400())).toEqual({
      statusCode: 400,
      body: "",
    });
  });

  it("should return 500 when generic Error was passed to create-handler", async () => {
    expect(handleCreateError(new Error())).toEqual({
      statusCode: 500,
      body: "",
    });
  });

  it("should return 404 when 404-Error was passed to get-handler", async () => {
    expect(handleGetError(new Error404())).toEqual({
      statusCode: 404,
      body: "",
    });
  });

  it("should return 500 when generic Error was passed to get-handler", async () => {
    expect(handleGetError(new Error())).toEqual({
      statusCode: 500,
      body: "",
    });
  });
});
