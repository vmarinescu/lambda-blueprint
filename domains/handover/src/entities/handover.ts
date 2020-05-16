import * as t from "io-ts";

export const Handover = t.type({
  id:   t.string,
  name: t.string,

  createdAt: t.string,
  updatedAt: t.string,
});

export type  Handover = t.TypeOf<typeof Handover>;
