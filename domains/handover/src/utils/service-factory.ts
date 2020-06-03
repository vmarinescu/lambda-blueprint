import { CrudRepository, ParameterStore } from "@lambda-blueprint/core";
import { Handover } from "../entities/handover";
import { Service } from "./service";
import { Keys } from "./keys";

export const createService = async (): Promise<Service> => {
  const parameterStore = new ParameterStore({});
  const parameters =
    await parameterStore.getParametersByPath(`/${process.env[Keys.ENV]}-handover/`);
  // Todo

  const tableName  = process.env[Keys.TABLE_NAME] || "";
  const repository = new CrudRepository<Handover>(tableName, {});

  return new Service(repository);
};
