import { CrudRepository, Error404 } from "@serverless-blueprint/core";
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
    return this.saveHandover(handover);
  }

  async deleteHandover(id: string): Promise<void> {
    const keys: Partial<Handover> = { id: id };
    return this.crudRepository.delete(keys); // Todo 404?
  }

  async getHandover(id: string): Promise<GetDto> {
    const item = await this.findHandover(id).catch((reason) => Promise.reject(reason));
    const { createdAt, updatedAt, ...getDto } = item;
    return getDto;
  }

  async updateHandover(id: string, updateDto: UpdateDto): Promise<void> {
    const item = await this.findHandover(id).catch((reason) => Promise.reject(reason));
    const date = new Date();

    const handover: Handover = {
      ...item,
      updatedAt: date.toISOString(),
      ...updateDto,
    };
    return this.saveHandover(handover);
  }

  private async findHandover(id: string): Promise<Handover> {
    const keys: Partial<Handover> = { id: id };
    const item = await this.crudRepository.find(keys).catch((reason) => Promise.reject(reason));
    if (!item) { throw new Error404(); }
    return item;
  }

  private async saveHandover(handover: Handover): Promise<void> {
    return pipe(
      Handover.decode(handover),
      fold(
        // failure handler
        (reason) => Promise.reject(reason),
        // success handler
        (result) => this.crudRepository.save(result),
      ),
    );
  }
}
