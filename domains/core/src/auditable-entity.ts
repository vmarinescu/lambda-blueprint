import * as t from "io-ts";

export const AuditableEntity = t.interface({
  createdAt: t.string,
  updatedAt: t.string,
});
