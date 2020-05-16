import * as t from "io-ts";

export const Customer = t.type({
  id:   t.string,
  name: t.string,

  createdAt: t.string,
  updatedAt: t.string,
});

export type  Customer = t.TypeOf<typeof Customer>;
