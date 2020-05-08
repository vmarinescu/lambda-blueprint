import DynamoDB from "aws-sdk/clients/dynamodb";
import { getEnv, Key } from "./envs-provider";

export class Repository<T = any> {
  private tableName: string;
  private docClient: DynamoDB.DocumentClient;

  constructor(tableName: string) {
    this.tableName = tableName;
    const endpoint = getEnv<string>(Key.DYNAMODB_ENDPOINT);

    this.docClient = new DynamoDB.DocumentClient({
      apiVersion: "2012-08-10",
      ...(endpoint ? { endpoint: endpoint } : {}),
      // if (endpoint == undefined), let AWS build your endpoint.
    });
  }

  async putItem(item: T): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: item,
    };
    try {
      await this.docClient.put(params).promise();
    } catch (error) {
      throw Error(`Putting item into DynamoDB failed. Reason: ${error}`);
    }
  }

  async getItem(keys: Partial<T>): Promise<T | undefined> {
    const params = {
      TableName: this.tableName,
      Key: keys,
    };
    try {
      const found = await this.docClient.get(params).promise();
      return found.Item as T;
    } catch (error) {
      throw Error(`Getting item from DynamoDB failed. Reason: ${error}`);
    }
  }
}
