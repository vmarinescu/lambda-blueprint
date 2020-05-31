import * as t from "io-ts";

export type  UpdateDto = t.TypeOf<typeof UpdateDto>;

export const UpdateDto = t.exact(t.interface({
  uuid: t.string,
}));
