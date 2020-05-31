import { CrudRepository } from "@serverless-blueprint/core";
import { Customer } from "./customer";
import { Service } from "./service";
import { Keys } from "./keys";

export const createService = async (): Promise<Service> => {
  // Todo: ssm

  const tableName  = process.env[Keys.TABLE_NAME] || "";
  const repository = new CrudRepository<Customer>({ tableName: tableName });

  return new Service(repository);
};
