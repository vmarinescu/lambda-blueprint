import { CrudRepository, getParametersByPath } from "@serverless-blueprint/core";
import { Handover } from "../entities/handover";
import { Service } from "./service";
import { Keys } from "./keys";

export const createService = async (): Promise<Service> => {
  const parameters =
    await getParametersByPath(`/${process.env[Keys.ENV]}-handover/`);
  // Todo ...

  const tableName  = process.env[Keys.TABLE_NAME] || "";
  const repository = new CrudRepository<Handover>({ tableName: tableName });

  return new Service(repository);
};
