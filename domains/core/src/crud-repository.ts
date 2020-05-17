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

  static of = (record: Record<string, any>): CrudRepositoryConfiguration => {
    return {
      tableName:           record[TABLE_NAME] as string,
      clientConfiguration: {}, // ...
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

  async create(item: T): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: item,
    };
    try {
      await this.client.put(params).promise();
    } catch (error) {
      // ...
      throw error;
    }
  }

  async findBy(keys: Partial<T>): Promise<T> {
    const params = {
      TableName: this.tableName,
      Key: keys,
    };
    try {
      const  found = await this.client.get(params).promise();
      return found.Item as T;
    } catch (error) {
      // ...
      throw error;
    }
  }

  async update(keys: Partial<T>, item: T): Promise<void> {}

  async delete(keys: Partial<T>): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: keys,
    };
    try {
      await this.client.delete(params).promise();
    } catch (error) {
      // ...
      throw error;
    }
  }
}
