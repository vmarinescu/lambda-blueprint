// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
import * as DynamoDB from "aws-sdk/clients/dynamodb";

export interface CrudRepositoryOptions {
  tableName: string;
  // Todo
}

export class CrudRepository<T extends object> {
  private tableName:      string;
  private documentClient: DynamoDB.DocumentClient;

  constructor(options: CrudRepositoryOptions) {
    this.tableName      = options.tableName;
    this.documentClient = new DynamoDB.DocumentClient({});
  }

  /**
   * Puts a single item with the given primary key by delegating to AWS.DynamoDB.DocumentClient.put().
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
      console.error(error); // Todo?
      throw error;
    }
  }

  /**
   * Gets a single item with the given primary key by delegating to AWS.DynamoDB.DocumentClient.get().
   * @param keys
   */
  async get(keys: Partial<T>): Promise<T | undefined> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: keys,
    };
    try {
      const  item = await this.documentClient.get(params).promise();
      return item.Item as T;
    } catch (error) {
      console.error(error); // Todo?
      throw error;
    }
  }

  /**
   * Updates a single item with the given primary key by delegating to AWS.DynamoDB.DocumentClient.update().
   * @param keys
   * @param item
   */
  async update(keys: Partial<T>, item: Partial<T>): Promise<void> {
    // Todo ...
    const itemKeys = Object.keys(item) as (keyof T)[];
    if (itemKeys.length === 0) {
      return;
    }
    const itemKey0 = itemKeys. shift() as keyof T;
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: keys,
      UpdateExpression: `set ${itemKey0} = :${itemKey0}`,
      ExpressionAttributeValues: { [`:${itemKey0}`]: item[itemKey0] },
    };
    itemKeys.forEach((itemKeyX) => {
      // @ts-ignore
      params.UpdateExpression += `, ${itemKeyX} = :${itemKeyX}`;
      // @ts-ignore
      params.ExpressionAttributeValues[`:${itemKeyX}`] = item[itemKeyX];
    });
    try {
      await this.documentClient.update(params).promise();
    } catch (error) {
      console.error(error); // Todo?
      throw error;
    }
  }

  /**
   * Deletes a single item with the given primary key by delegating to AWS.DynamoDB.DocumentClient.delete().
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
      console.error(error); // Todo?
      throw error;
    }
  }
}
