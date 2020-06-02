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
   *
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
   *
   * @param keys
   *
   * @throws {EntityNotFoundError}
   */
  async get(keys: Partial<T>): Promise<T> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: keys,
    };
    let item;
    try {
      item = await this.documentClient.get(params).promise();
    } catch (error) {
      console.error(error); // Todo?
      throw error;
    }
    if (!item) { throw new EntityNotFoundError(); } // Todo: Modify behaviour?
    return item.Item as T;
  }

  /**
   * Updates a single item with the given primary key by delegating to AWS.DynamoDB.DocumentClient.update().
   *
   * @param keys
   * @param item
   *
   * @throws {EntityNotFoundError}
   */
  async update(keys: Partial<T>, item: Partial<T>): Promise<void> {
    const itemKeys = Object.keys(item); // Todo?
    const itemKey0 = itemKeys. shift();
    if (!itemKey0) {
      return;
    }
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: keys,
      ConditionExpression: Object.keys(keys).map((key) => `attribute_exists(${key})`).join(" and "),
      UpdateExpression: `set #${itemKey0} = :${itemKey0}`,
      ExpressionAttributeNames:  { [`#${itemKey0}`]: itemKey0 },
      ExpressionAttributeValues: { [`:${itemKey0}`]: item[itemKey0] },
    };
    itemKeys.forEach((itemKeyX) => {
      params.UpdateExpression += `, #${itemKeyX} = :${itemKeyX}`;
      params.ExpressionAttributeNames ![`#${itemKeyX}`] = itemKeyX;
      params.ExpressionAttributeValues![`:${itemKeyX}`] = item[itemKeyX];
    });
    try {
      await this.documentClient.update(params).promise();
    } catch (error) {
      console.error(error); // Todo?
      if (error.code === "ConditionalCheckFailedException") {
        throw new EntityNotFoundError();
      }
      throw error;
    }
  }

  /**
   * Deletes a single item with the given primary key by delegating to AWS.DynamoDB.DocumentClient.delete().
   *
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
