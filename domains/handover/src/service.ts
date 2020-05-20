import { CrudRepository, Error404, Error500 } from "@serverless-blueprint/core";
import { pipe } from "fp-ts/lib/pipeable"
import { fold } from "fp-ts/lib/Either"
import { v4 as uuidv4 } from "uuid";
import { CreateDto } from "./dtos/create-dto";
import { GetDto } from "./dtos/get-dto";
import { UpdateDto } from "./dtos/update-dto";
import { Handover } from "./entities/handover";

export class Service {
  constructor(
    private crudRepository: CrudRepository<Handover>
  ) {}

  async createHandover(createDto: CreateDto): Promise<void> {
    const date = new Date();

    const handover: Handover = {
      id: uuidv4(),
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      ...createDto,
    };
    await pipe(
      Handover.decode(handover),
      fold(
        // failure handler
        async () => {
          throw new Error500(); // Todo ...
        },
        // success handler
        async () => {
          await this.crudRepository.put(handover);
        },
      )
    );
    // Todo ...
  }

  async deleteHandover(id: string): Promise<void> {
    const keys: Partial<Handover> = { id: id };
    await this.crudRepository.delete(keys);
  }

  async getHandover(id: string): Promise<GetDto> {
    const keys: Partial<Handover> = { id: id };
    const found = await this.crudRepository.get(keys);
    if (!found) { throw new Error404(); }

    const { createdAt, updatedAt, ...getDto } = found;
    return getDto;
  }

  async updateHandover(id: string, updateDto: UpdateDto): Promise<void> {}
}
