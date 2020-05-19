import { AuditableEntity } from "@serverless-blueprint/core";
import * as iots from "io-ts";

export type  Customer = iots.TypeOf<typeof Customer>;

export const Customer = iots.intersection([
  AuditableEntity,
  // ...
  iots.interface({
    id:   iots.string,
    name: iots.string,
  }),
]);
