import DynamoDB from "aws-sdk/clients/dynamodb";

const endpoint = process.env.DYNAMODB_ENDPOINT;
if (!endpoint) {
  throw Error("DYNAMODB_ENDPOINT is missing.");
}

const options: DynamoDB.ClientConfiguration = {
  apiVersion: "2012-08-10",
  endpoint: endpoint,
};

const client = new DynamoDB({
  ...options,
});

export type DataType = "B" | "N" | "S";

export interface HashKey {
  name: string;
  type: DataType;
}

export interface SortKey {
  name: string;
  type: DataType;
}

export async function createTable(tableName: string, hashKey: HashKey): Promise<void> {
  const attributeDefinitions: DynamoDB.AttributeDefinitions = [
    { AttributeName: hashKey.name, AttributeType: hashKey.type },
  ];
  const keySchema: DynamoDB.KeySchema = [
    { AttributeName: hashKey.name, KeyType: "HASH" },
  ];
  const billingMode = "PAY_PER_REQUEST";

  const createTableInput: DynamoDB.CreateTableInput = {
    AttributeDefinitions: attributeDefinitions,
    TableName: tableName,
    KeySchema: keySchema,
    BillingMode: billingMode,
  };
  await client.createTable(createTableInput).promise();
}

export async function deleteTable(tableName: string): Promise<void> {
  const deleteTableInput: DynamoDB.DeleteTableInput = {
    TableName: tableName,
  };
  await client.deleteTable(deleteTableInput).promise();
}
