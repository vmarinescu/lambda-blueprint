import * as t from "io-ts";

export const GetDto = t.type({
  id:   t.string,
  name: t.string,
});

export type  GetDto = t.TypeOf<typeof GetDto>;
