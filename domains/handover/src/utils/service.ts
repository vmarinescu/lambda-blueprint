import { CrudRepository, Error404, deepMerge } from "@lambda-blueprint/core";
import { v4 as uuidv4 } from "uuid";
import { CreateDto } from "../dtos/create-dto";
import { HandoverDto } from "../dtos/handover-dto";
import { UpdateDto } from "../dtos/update-dto";
import { Handover } from "../entities/handover";

export class Service {
  constructor(
    private crudRepository: CrudRepository<Handover>
  ) {}

  async createHandover(createDto: CreateDto): Promise<string> {
    const date = new Date();

    // Todo
    const handover: Handover = {
      id: uuidv4(),
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      ...createDto,
    };
    await this.crudRepository.put(handover).catch((reason: any) => Promise.reject(reason));
    return handover.id;
  }

  async deleteHandover(id: string): Promise<void> {
    const keys: Partial<Handover> = { id };
    return this.crudRepository.delete(keys);
  }

  async getHandover(id: string): Promise<HandoverDto> {
    const keys: Partial<Handover> = { id };
    const handover = await this.crudRepository.get(keys).catch((reason: any) => Promise.reject(reason));
    if (!handover) { throw new Error404(); }
    const { createdAt, updatedAt, ...handoverDto } = handover;
    return handoverDto;
  }

  async updateHandover(id: string, updateDto: UpdateDto): Promise<void> {
    const keys: Partial<Handover> = { id };
    const handover = await this.crudRepository.get(keys).catch((reason: any) => Promise.reject(reason));
    if (!handover) { throw new Error404(); }
    handover.updatedAt = new Date().toISOString();
    const handoverUpdated = deepMerge(handover, updateDto); // Todo
    return this.crudRepository.put(handoverUpdated);
  }
}
