import { CrudRepository, EntityNotFoundError, Error404 } from "@serverless-blueprint/core";
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
    const keys: Partial<Handover> = { id: id };
    return this.crudRepository.delete(keys);
  }

  async getHandover(id: string): Promise<HandoverDto> {
    const keys: Partial<Handover> = { id: id };
    const handover = await this.crudRepository.get(keys)
      .catch((reason: any) => {
        if (reason.constructor === EntityNotFoundError) { throw new Error404(); }
        throw reason;
      });
    const { createdAt, updatedAt, ...handoverDto } = handover;
    return handoverDto;
  }

  async updateHandover(id: string, updateDto: UpdateDto): Promise<void> {
    const keys: Partial<Handover> = { id: id };
    const date = new Date();

    const handover: Partial<Handover> = { updatedAt: date.toISOString(), ...updateDto };
    await this.crudRepository.update(keys, handover)
      .catch((reason: any) => {
        if (reason.constructor === EntityNotFoundError) { throw new Error404(); }
        throw reason;
      });
  }
}
