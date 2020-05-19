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

  /**
   * Puts a single item by delegating to AWS.DynamoDB.putItem().
   * @param item
   */
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

  /**
   * Gets a single item by the given primary key by delegating to AWS.DynamoDB.getItem().
   * Returns undefined when item has not been found.
   * @param keys
   */
  async get(keys: Partial<T>): Promise<T | undefined> {
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

  /**
   * Updates a single item by the given primary key by delegating to AWS.DynamoDB.updateItem().
   * @param keys
   * @param item
   */
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

  /**
   * Deletes a single item by the given primary key by delegating to AWS.DynamoDB.deleteItem().
   * @param keys
   */
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
