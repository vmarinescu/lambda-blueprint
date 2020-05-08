import { Key } from "../../src/key";
import { Service } from "../../src/service";

jest.mock(""); // TODO

process.env[Key.CUSTOMER_TABLE] = "customer";
const service = new Service();

describe("service", () => {
  it.todo("should create customer when valid customer has been passed");

  it.todo("should throw 400-Error when invalid customer has been passed");

  it.todo("should return customer when customer has been found");

  it.todo("should throw 404-Error when customer has not been found");
});
