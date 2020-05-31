import { CrudRepository, decrypt } from "@serverless-blueprint/core";
import { Customer } from "./entities/customer";
import { Service } from "./service";
import { Keys } from "./keys";

export async function initialize(): Promise<Service> {
  // @ts-ignore
  process.env = await decrypt(process.env).catch((reason: any) => Promise.reject(reason));

  const tableName  = process.env[Keys.TABLE_NAME] || "";
  const repository = new CrudRepository<Customer>({ tableName: tableName });

  return new Service(repository);
}
