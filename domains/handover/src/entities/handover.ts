import { AuditableEntity } from "@serverless-blueprint/core";
import * as t from "io-ts";

export type  Handover = t.TypeOf<typeof Handover>;

export const Handover = t.exact(t.intersection([
  AuditableEntity,
  // ...
  t.interface({
    id:   t.string, // Partition-Key
    name: t.string,
  }),
]));
