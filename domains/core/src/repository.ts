import DynamoDB from "aws-sdk/clients/dynamodb";

export class Repository<T = any> {
  private tableName: string;
  private docClient: DynamoDB.DocumentClient;

  constructor(tableName: string, endpoint?: string) {
    this.tableName = tableName;
    this.docClient = new DynamoDB.DocumentClient({
      apiVersion: "2012-08-10",
      endpoint: endpoint,
    });
  }

  async create(item: T): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: item,
    };
    try {
      await this.docClient.put(params).promise();
    } catch (error) {
      throw Error(`Creating item failed. Reason: ${error}`);
    }
  }

  async read(keys: Partial<T>): Promise<T | undefined> {
    const params = {
      TableName: this.tableName,
      Key: keys,
    };
    try {
      const found = await this.docClient.get(params).promise();
      return found.Item as T;
    } catch (error) {
      throw Error(`Reading item failed. Reason: ${error}`);
    }
  }

  async update(keys: Partial<T>, item: T): Promise<void> {}

  async delete(keys: Partial<T>): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: keys,
    };
    try {
      await this.docClient.delete(params).promise();
    } catch (error) {
      throw Error(`Deleting item failed. Reason: ${error}`);
    }
  }
}
