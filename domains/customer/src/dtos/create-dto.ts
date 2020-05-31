import * as t from "io-ts";

export type  CreateDto = t.TypeOf<typeof CreateDto>;

export const CreateDto = t.exact(t.interface({
  alias: t.string,
}));
