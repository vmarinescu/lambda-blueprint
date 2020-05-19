import * as iots from "io-ts";
import { AuditableEntity } from "@serverless-blueprint/core";

export const Customer = iots.intersection([
  AuditableEntity,
  // ...
  iots.interface({
    id:   iots.string,
    name: iots.string,
  }),
]);

export type  Customer = iots.TypeOf<typeof Customer>;
