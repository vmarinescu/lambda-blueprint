import { AuditableEntity } from "@lambda-blueprint/core";
import * as t from "io-ts";

export type  Handover = t.TypeOf<typeof Handover>;

export const Handover = t.exact(t.intersection([
  AuditableEntity,
  // ...
  t.interface({
    id:        t.string, // Partition-Key
    property1: t.string,
    property2: t.string,
    property3: t.string,
    property4: t.string,
    property5: t.string,
  }),
]));
