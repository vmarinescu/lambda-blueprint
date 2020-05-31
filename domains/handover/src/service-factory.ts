import { CrudRepository } from "@serverless-blueprint/core";
import { Handover } from "./handover";
import { Service } from "./service";
import { Keys } from "./keys";

export const createService = async (): Promise<Service> => {
  // Todo: ssm

  const tableName  = process.env[Keys.TABLE_NAME] || "";
  const repository = new CrudRepository<Handover>({ tableName: tableName });

  return new Service(repository);
};
