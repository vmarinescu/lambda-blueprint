import * as t from "io-ts";

export type  CreateDto = t.TypeOf<typeof CreateDto>;

export const CreateDto = t.strict({
  property1: t.string,
  property2: t.string,
  property3: t.string,
  property4: t.string,
  property5: t.string,

  property6: t.strict({
    property1: t.string,
    property2: t.string,
  }),
});
