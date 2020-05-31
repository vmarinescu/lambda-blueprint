import { CrudRepository } from "@serverless-blueprint/core";
import { Customer } from "./entities/customer";
import { Service } from "./service";
import { Keys } from "./keys";

export const createApplicationContext = async (): Promise<Service> => {
  // Todo: ssm

  const tableName  = process.env[Keys.TABLE_NAME] || "";
  const repository = new CrudRepository<Customer>({ tableName: tableName });

  return new Service(repository);
};
