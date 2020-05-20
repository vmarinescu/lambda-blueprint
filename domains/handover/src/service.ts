import { CrudRepository, Error500 } from "@serverless-blueprint/core";
import { pipe } from "fp-ts/lib/pipeable"
import { fold } from "fp-ts/lib/Either"
import { v4 as uuidv4 } from "uuid";
import { CreateDto } from "./dtos/create-dto";
import { GetDto } from "./dtos/get-dto";
import { UpdateDto } from "./dtos/update-dto";
import { Handover } from "./entities/handover";

export class Service {
  private crudRepository: CrudRepository<Handover>;

  constructor(crudRepository: CrudRepository<Handover>) {
    this.crudRepository = crudRepository;
  }

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
          throw new Error500(); // Todo
        },
        // success handler
        async () => {
          await this.crudRepository.put(handover);
        },
      )
    );
    console.debug("201");
  }

  async deleteHandover(id: string): Promise<void> {}

  // @ts-ignore
  async getHandover(id: string): Promise<GetDto> {}

  async updateHandover(id: string, updateDto: UpdateDto): Promise<void> {}
}
