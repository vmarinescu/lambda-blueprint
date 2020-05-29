import { AuditableEntity } from "@serverless-blueprint/core";
import * as t from "io-ts";

export type  Customer = t.TypeOf<typeof Customer>;

export const Customer = t.exact(t.intersection([
  AuditableEntity,
  // ...
  t.interface({
    id:   t.string, // Partition-Key
    etag: t.string,
  }),
]));
