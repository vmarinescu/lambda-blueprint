import { CrudRepository, Error404 } from "@serverless-blueprint/core";
import { v4 as uuidv4 } from "uuid";
import { CreateDto } from "./dtos/create-dto";
import { HandoverDto } from "./dtos/handover-dto";
import { UpdateDto } from "./dtos/update-dto";
import { Handover } from "./entities/handover";

export class Service {
  constructor(
    private crudRepository: CrudRepository<Handover>
  ) {}

  async createHandover(createDto: CreateDto): Promise<HandoverDto> {
    const date = new Date();

    const handover: Handover = {
      id: uuidv4(),
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      ...createDto,
    };
    await this.crudRepository.put(handover).catch((reason: any) => Promise.reject(reason));
    const { createdAt, updatedAt, ...handoverDto } = handover;
    return handoverDto;
  }

  async deleteHandover(id: string): Promise<void> {
    const keys: Partial<Handover> = { id: id };
    return this.crudRepository.delete(keys);
  }

  async getHandover(id: string): Promise<HandoverDto> {
    const keys: Partial<Handover> = { id: id };
    const handover = await this.crudRepository.get(keys).catch((reason: any) => Promise.reject(reason));
    if (!handover) { throw new Error404(); }
    const { createdAt, updatedAt, ...handoverDto } = handover;
    return handoverDto;
  }

  async updateHandover(id: string, updateDto: UpdateDto): Promise<void> {
    const keys: Partial<Handover> = { id: id };
    const date = new Date();

    const handover: Partial<Handover> = { updatedAt: date.toISOString(), ...updateDto };
    return this.crudRepository.update(keys, handover);
  }
}
