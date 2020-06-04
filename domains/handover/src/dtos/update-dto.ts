import * as t from "io-ts";

export type  UpdateDto = t.TypeOf<typeof UpdateDto>;

export const UpdateDto = t.exact(t.partial({
  property1: t.string,
  property2: t.string,
  property3: t.string,
  property4: t.string,
  property5: t.string,
}));
