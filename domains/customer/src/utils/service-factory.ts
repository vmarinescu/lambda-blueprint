import { CrudRepository, getParametersByPath } from "@serverless-blueprint/core";
import { Customer } from "../entities/customer";
import { Service } from "./service";
import { Keys } from "./keys";

export const createService = async (): Promise<Service> => {
  const parameters =
    await getParametersByPath(`/${process.env[Keys.ENV]}-customer/`);
  // Todo ...

  const tableName  = process.env[Keys.TABLE_NAME] || "";
  const repository = new CrudRepository<Customer>({ tableName: tableName });

  return new Service(repository);
};
