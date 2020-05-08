import DynamoDB from "aws-sdk/clients/dynamodb";
import { Repository } from "../../src/repository";

jest.mock("aws-sdk/clients/dynamodb");

const anyTable   = "anyTable";
const repository = new Repository<any>(anyTable);

describe("repository", () => {
  it("should get item from dynamodb when get-call was successful", async () => {
    const getSpy = jest
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
    await repository.getItem(keys);
    const paramsToCheck = {
      TableName: anyTable,
      Key: keys,
    };
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith(paramsToCheck);
  });

  it("should throw error when get-call failed", async () => {
    const getSpy = jest
      .spyOn(DynamoDB.DocumentClient.prototype, "get")
      .mockImplementation(
        () =>
          ({
            promise: jest.fn().mockRejectedValueOnce(new Error()),
          } as any)
      );
    await expect(repository.getItem({})).rejects.toThrow();
    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  it("should put item into dynamodb when put-call was successful", async () => {
    const putSpy = jest
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
    await repository.putItem(item);
    const paramsToCheck = {
      TableName: anyTable,
      Item: item,
    };
    expect(putSpy).toHaveBeenCalledTimes(1);
    expect(putSpy).toHaveBeenCalledWith(paramsToCheck);
  });

  it("should throw error when put-call failed", async () => {
    const putSpy = jest
      .spyOn(DynamoDB.DocumentClient.prototype, "put")
      .mockImplementation(
        () =>
          ({
            promise: jest.fn().mockRejectedValueOnce(new Error()),
          } as any)
      );
    await expect(repository.putItem({})).rejects.toThrow();
    expect(putSpy).toHaveBeenCalledTimes(1);
  });
});
