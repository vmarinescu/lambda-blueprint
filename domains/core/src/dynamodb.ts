import DynamoDB from "aws-sdk/clients/dynamodb";

export interface CrudRepositoryOptions<T> {
  /**
   * The host of the DB to connect to.
   */
  host?: string;
  /**
   * The port of the DB to connect to.
   */
  port?: string;
  /**
   * The username of the DB to connect to.
   */
  username?: string;
  /**
   * The password of the DB to connect to.
   */
  password?: string;
  /**
   * The name of the DB to connect to.
   */
  db: string;
}

export class CrudRepository<T = any> {
  private tableName:      string;
  private documentClient: DynamoDB.DocumentClient;

  constructor(options: CrudRepositoryOptions<T>) {
    this.tableName      = options.db;
    // Todo
    this.documentClient = new DynamoDB.DocumentClient({});
  }

  /**
   * Puts a single item with the given primary key by delegating to AWS.DynamoDB.putItem().
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
   * Gets a single item with the given primary key by delegating to AWS.DynamoDB.getItem().
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
   * Updates a single item with the given primary key by delegating to AWS.DynamoDB.updateItem().
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
   * Deletes a single item with the given primary key by delegating to AWS.DynamoDB.deleteItem().
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
