import * as t from "io-ts";

export type  HandoverDto = t.TypeOf<typeof HandoverDto>;

export const HandoverDto = t.strict({
  id:        t.string,
  property1: t.string,
  property2: t.string,
  property3: t.string,
  property4: t.string,
  property5: t.string,
});
