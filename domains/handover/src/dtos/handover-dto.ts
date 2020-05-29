import * as t from "io-ts";

export type  HandoverDto = t.TypeOf<typeof HandoverDto>;

export const HandoverDto = t.exact(t.interface({
  id:   t.string,
  etag: t.string,
}));
