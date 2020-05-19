import * as iots from "io-ts";
import { AuditableEntity } from "@serverless-blueprint/core";

export const Handover = iots.intersection([
  AuditableEntity,
  // ...
  iots.interface({
    id:   iots.string,
    name: iots.string,
  }),
]);

export type  Handover = iots.TypeOf<typeof Handover>;
