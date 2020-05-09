import DynamoDB from "aws-sdk/clients/dynamodb";
import { Repository } from "../../src/repository";

jest.mock("aws-sdk/clients/dynamodb");

const anyTable   = "anyTable";
const repository = new Repository<any>(anyTable);

describe("repository", () => {
  it("should create item when create-call was successful", async () => {
    const createSpy = jest
      .spyOn(DynamoDB.DocumentClient.prototype, "put")
      .mockImplementation(
        () =>
          ({
            promise: jest.fn().mockResolvedValue({}),
          } as any)
      );
    const item = {
      id: "9b7ab301-fbf8-41ba-b22b-8ff7fe1544ba",
    };
    await repository.create(item);
    const paramsToCheck = {
      TableName: anyTable,
      Item: item,
    };
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith(paramsToCheck);
  });

  it("should throw error when create-call failed", async () => {
    const createSpy = jest
      .spyOn(DynamoDB.DocumentClient.prototype, "put")
      .mockImplementation(
        () =>
          ({
            promise: jest.fn().mockRejectedValueOnce(new Error()),
          } as any)
      );
    await expect(repository.create({})).rejects.toThrow();
    expect(createSpy).toHaveBeenCalledTimes(1);
  });

  it("should read item when read-call was successful", async () => {
    const readSpy = jest
      .spyOn(DynamoDB.DocumentClient.prototype, "get")
      .mockImplementation(
        () =>
          ({
            promise: jest.fn().mockResolvedValue({}),
          } as any)
      );
    const keys = {
      id: "9b7ab301-fbf8-41ba-b22b-8ff7fe1544ba",
    };
    await repository.read(keys);
    const paramsToCheck = {
      TableName: anyTable,
      Key: keys,
    };
    expect(readSpy).toHaveBeenCalledTimes(1);
    expect(readSpy).toHaveBeenCalledWith(paramsToCheck);
  });

  it("should throw error when read-call failed", async () => {
    const readSpy = jest
      .spyOn(DynamoDB.DocumentClient.prototype, "get")
      .mockImplementation(
        () =>
          ({
            promise: jest.fn().mockRejectedValueOnce(new Error()),
          } as any)
      );
    await expect(repository.read({})).rejects.toThrow();
    expect(readSpy).toHaveBeenCalledTimes(1);
  });

  it.todo("should update item when update-call was successful");

  it.todo("should throw error when update-call failed");

  it("should delete item when delete-call was successful", async () => {
    const deleteSpy = jest
      .spyOn(DynamoDB.DocumentClient.prototype, "delete")
      .mockImplementation(
        () =>
          ({
            promise: jest.fn().mockResolvedValue({}),
          } as any)
      );
    const keys = {
      id: "9b7ab301-fbf8-41ba-b22b-8ff7fe1544ba",
    };
    await repository.delete(keys);
    const paramsToCheck = {
      TableName: anyTable,
      Key: keys,
    };
    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledWith(paramsToCheck);
  });

  it("should throw error when delete-call failed", async () => {
    const deleteSpy = jest
      .spyOn(DynamoDB.DocumentClient.prototype, "delete")
      .mockImplementation(
        () =>
          ({
            promise: jest.fn().mockRejectedValueOnce(new Error()),
          } as any)
      );
    await expect(repository.delete({})).rejects.toThrow();
    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });
});
