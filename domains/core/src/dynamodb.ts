// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
import * as DynamoDB from "aws-sdk/clients/dynamodb";

export type  Entity = Record<string, any>;
export class EntityNotFoundError extends Error {}

export interface CrudRepositoryOptions {
  tableName: string;
  // Todo?
}

export class CrudRepository<T extends Entity> {
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
   * @param  keys
   * @return {Promise<T | undefined>}
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
   * @param  keys
   * @param  item
   * @return {Promise<T | undefined>}
   */
  async update(keys: Partial<T>, item: Partial<T>): Promise<T | undefined> {
    const itemKeys = Object.keys(item);
    const itemKey0 = itemKeys[0];
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: keys,
      ConditionExpression: Object.keys(keys).map((key) => `attribute_exists(${key})`).join(" and "),
      UpdateExpression: `set #${itemKey0} = :${itemKey0}`,
      ExpressionAttributeNames:  { [`#${itemKey0}`]: itemKey0 },
      ExpressionAttributeValues: { [`:${itemKey0}`]: item[itemKey0] },
      ReturnValues: "ALL_NEW",
    };
    itemKeys.splice(1).forEach((itemKeyX) => {
      params.UpdateExpression += `, #${itemKeyX} = :${itemKeyX}`;
      params.ExpressionAttributeNames ![`#${itemKeyX}`] = itemKeyX;
      params.ExpressionAttributeValues![`:${itemKeyX}`] = item[itemKeyX];
    });
    try {
      const  item = await this.documentClient.update(params).promise();
      return item.Attributes as T;
    } catch (error) {
      console.error(error); // Todo?
      if (error.code === "ConditionalCheckFailedException") {
        return undefined;
      }
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
