import { Error404, Repository } from "@serverless-blueprint/core";
import { CreateHandoverDto } from "./dtos/handover-dto";
import { Handover } from "./entities/handover-entity";

export class Service {
  private repository: Repository<Handover>;

  constructor(repository: Repository<Handover>) {
    this.repository = repository;
  }

  async createHandover(handoverDto: CreateHandoverDto): Promise<void> {
    // Todo: Transform and validate the handoverDto.
    const handoverEntity = handoverDto;
    await this.repository.create(handoverEntity);
  }

  async getHandover(id: string): Promise<CreateHandoverDto> {
    const keys: Partial<Handover> = { id: id };
    const handoverEntity = await this.repository.read(keys);

    if (!handoverEntity) throw new Error404();

    // TODO: Maybe modify and exclude props before delivery?
    return handoverEntity as CreateHandoverDto;
  }
}
