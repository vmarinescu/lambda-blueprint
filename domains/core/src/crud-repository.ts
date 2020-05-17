import DynamoDB from "aws-sdk/clients/dynamodb";

export const TABLE_NAME = "TABLE_NAME";

/**
 * @example
 * const options = CrudRepositoryOptions.of(process.env);
 */
export class CrudRepositoryOptions {
  tableName: string;
  dbOptions: DynamoDB.Types.ClientConfiguration;

  static of = (record: Record<string, any>): CrudRepositoryOptions => {
    return {
      tableName: record[TABLE_NAME] as string,
      dbOptions: {}, // ...
    };
  }
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
