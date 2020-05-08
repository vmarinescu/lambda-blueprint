import { getEnv } from "../../src/envs-provider";

const keyFoo = "keyFoo";
const keyBar = "keyBar";

describe("env-provider", () => {
  it("should return object when env-var is specified as object", () => {
    const object = { key: "value" };
    process.env[keyFoo] = JSON.stringify(object);
    expect(getEnv<object>(keyFoo)).toEqual(object);
  });

  it("should return array when env-var is specified as array", () => {
    const array = ["value"];
    process.env[keyFoo] = JSON.stringify(array);
    expect(getEnv<string[]>(keyFoo)).toEqual(array);
  });

  it("should return string when env-var is specified as string", () => {
    process.env[keyFoo] = "string";
    expect(getEnv<string>(keyFoo)).toEqual("string");
  });

  it("should return number when env-var is specified as number", () => {
    process.env[keyFoo] = "42";
    expect(getEnv<number>(keyFoo)).toEqual(42);
  });

  it("should return boolean when env-var is specified as boolean", () => {
    process.env[keyFoo] = "false";
    expect(getEnv<boolean>(keyFoo)).toEqual(false);
  });

  it("should return undefined when env-var is undefined and not required", () => {
    expect(getEnv(keyBar)).toEqual(undefined);
  });

  it("should throw error when env-var is undefined and required", () => {
    expect(() => getEnv(keyBar, { required: true })).toThrow();
  });
});
