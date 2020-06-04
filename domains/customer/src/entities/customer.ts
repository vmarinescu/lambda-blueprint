import { AuditableEntity } from "@lambda-blueprint/core";
import * as t from "io-ts";

export type  Customer = t.TypeOf<typeof Customer>;

export const Customer = t.intersection([
  AuditableEntity,
  // ...
  t.strict({
    id:        t.string, // Partition-Key
    property1: t.string,
    property2: t.string,
    property3: t.string,
    property4: t.string,
    property5: t.string,

    property6: t.strict({
      property1: t.string,
      property2: t.string,
    }),
  }),
]);
