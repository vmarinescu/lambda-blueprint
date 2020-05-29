import * as t from "io-ts";

export type  CustomerDto = t.TypeOf<typeof CustomerDto>;

export const CustomerDto = t.exact(t.interface({
  id:   t.string,
  etag: t.string,
}));
