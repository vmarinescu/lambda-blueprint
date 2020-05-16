import * as t from "io-ts";

export const UpdateDto = t.type({
  name: t.string,
});

export type  UpdateDto = t.TypeOf<typeof UpdateDto>;
