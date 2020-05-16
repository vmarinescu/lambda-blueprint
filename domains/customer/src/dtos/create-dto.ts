import * as t from "io-ts";

export const CreateDto = t.type({
  name: t.string,
});

export type  CreateDto = t.TypeOf<typeof CreateDto>;
