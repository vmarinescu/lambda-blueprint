import { AuditableEntity } from "@serverless-blueprint/core";
import * as iots from "io-ts";

export type  Handover = iots.TypeOf<typeof Handover>;

export const Handover = iots.intersection([
  AuditableEntity,
  // ...
  iots.interface({
    id:   iots.string,
    name: iots.string,
  }),
]);
