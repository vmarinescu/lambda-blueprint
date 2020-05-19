import DynamoDB from "aws-sdk/clients/dynamodb";

// env-vars
export const TABLE_NAME = "TABLE_NAME";
// Todo

export class CrudRepository<T = any> {
  private readonly tableName:      string;
  private readonly documentClient: DynamoDB.DocumentClient;

  constructor() {
    // Todo
    this.tableName      = "";
    this.documentClient = new DynamoDB.DocumentClient({});
  }

  async put(item: T): Promise<void> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: item,
    };
    try {
      await this.documentClient.put(params).promise();
    } catch (error) {
      // Todo
      throw error;
    }
  }

  async get(keys: Partial<T>): Promise<T> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: keys,
    };
    try {
      const  found = await this.documentClient.get(params).promise();
      return found.Item as T;
    } catch (error) {
      // Todo
      throw error;
    }
  }

  async update(keys: Partial<T>, item: T): Promise<void> {
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: keys,
      UpdateExpression: "",
      ExpressionAttributeNames:  {},
      ExpressionAttributeValues: {}, // Todo
    };
    try {
      await this.documentClient.update(params).promise();
    } catch (error) {
      // Todo
      throw error;
    }
  }

  async delete(keys: Partial<T>): Promise<void> {
    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: this.tableName,
      Key: keys,
    };
    try {
      await this.documentClient.delete(params).promise();
    } catch (error) {
      // Todo
      throw error;
    }
  }
}
