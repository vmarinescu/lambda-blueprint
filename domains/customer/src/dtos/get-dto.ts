import * as t from "io-ts";

export type  GetDto = t.TypeOf<typeof GetDto>;

export const GetDto = t.exact(t.interface({
  id:   t.string,
  name: t.string,
}));
