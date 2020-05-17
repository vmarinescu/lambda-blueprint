import DynamoDB from "aws-sdk/clients/dynamodb";

export const TABLE_NAME = "TABLE_NAME";
// ...

/**
 * @example
 * const configuration = CrudRepositoryConfiguration.of(process.env);
 */
export class CrudRepositoryConfiguration {
  tableName:           string;
  clientConfiguration: DynamoDB.Types.ClientConfiguration;

  static of = (record: Record<string, string>): CrudRepositoryConfiguration => {
    return {
      tableName:           record[TABLE_NAME],
      clientConfiguration: {}, // Todo
    };
  }
}

export class CrudRepository<T = any> {
  private tableName: string;
  private client:    DynamoDB.DocumentClient;

  constructor(configuration: CrudRepositoryConfiguration) {
    this.tableName = configuration.tableName;
    this.client    = new DynamoDB.DocumentClient(configuration.clientConfiguration);
  }

  async put(item: T): Promise<void> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: item,
    };
    try {
      await this.client.put(params).promise();
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
      const  found = await this.client.get(params).promise();
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
      await this.client.update(params).promise();
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
      await this.client.delete(params).promise();
    } catch (error) {
      // Todo
      throw error;
    }
  }
}
