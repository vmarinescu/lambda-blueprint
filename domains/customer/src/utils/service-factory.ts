import { CrudRepository, ParameterStore } from "@lambda-blueprint/core";
import { Customer } from "../entities/customer";
import { Service } from "./service";
import { Keys } from "./keys";

export const createService = async (): Promise<Service> => {
  const parameterStore = new ParameterStore({});
  const parameters =
    await parameterStore.getParametersByPath(`/${process.env[Keys.ENV]}-customer/`);
  // Todo

  const tableName  = process.env[Keys.TABLE_NAME] || "";
  const repository = new CrudRepository<Customer>(tableName, {});

  return new Service(repository);
};
