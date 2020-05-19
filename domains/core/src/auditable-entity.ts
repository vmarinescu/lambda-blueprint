import * as iots from "io-ts";

export const AuditableEntity = iots.interface({
  createdAt: iots.string,
  updatedAt: iots.string,
});
