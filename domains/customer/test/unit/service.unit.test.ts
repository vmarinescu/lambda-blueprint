import { Key } from "../../src/key";
import { Service } from "../../src/service";

jest.mock(""); // TODO

process.env[Key.CUSTOMER_TABLE] = "customer";
const service = new Service();

describe("service", () => {
  it.todo("should create customer when valid customer has been passed", async () => {});

  it.todo("should throw ValidationError when invalid customer has been passed", async () => {});

  it.todo("should return customer when customer has been found", async () => {});

  it.todo("should throw NotFoundError when customer has not been found", async () => {});
});
