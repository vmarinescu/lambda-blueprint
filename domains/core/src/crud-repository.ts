import DynamoDB from "aws-sdk/clients/dynamodb";

export interface CrudRepositoryOptions {
  tableName: string;
  dbOptions: DynamoDB.Types.ClientConfiguration;
}

export class CrudRepository<T = any> {
  private tableName: string;
  private docClient: DynamoDB.DocumentClient;

  constructor(options: CrudRepositoryOptions) {
    this.tableName = options.tableName;
    this.docClient = new DynamoDB.DocumentClient({
      ...options.dbOptions,
    });
  }

  async create(item: T): Promise<void> {}

  // @ts-ignore
  async read(keys: Partial<T>): Promise<T> {}

  async update(keys: Partial<T>, item: T): Promise<void> {}

  async delete(keys: Partial<T>): Promise<void> {}
}
