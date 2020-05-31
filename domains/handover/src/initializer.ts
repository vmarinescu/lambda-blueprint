import { CrudRepository, decrypt } from "@serverless-blueprint/core";
import { Handover } from "./entities/handover";
import { Service } from "./service";
import { Keys } from "./keys";

export async function initialize(): Promise<Service> {
  // @ts-ignore
  process.env = await decrypt(process.env).catch((reason: any) => Promise.reject(reason));

  const tableName  = process.env[Keys.TABLE_NAME] || "";
  const repository = new CrudRepository<Handover>({ tableName: tableName });

  return new Service(repository);
}
