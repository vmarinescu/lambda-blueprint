import { Error404, Repository } from "@serverless-blueprint/core";
import { HandoverDto } from "./dtos/handover-dto";
import { HandoverEntity } from "./entities/handover-entity";

export class Service {
  private repository: Repository<HandoverEntity>;

  constructor(repository: Repository<HandoverEntity>) {
    this.repository = repository;
  }

  async createHandover(handoverDto: HandoverDto): Promise<void> {}

  async getHandover(id: string): Promise<HandoverDto> {
    const keys: Partial<HandoverEntity> = { id: id };
    const handoverEntity = await this.repository.read(keys);

    if (!handoverEntity) throw new Error404();

    // TODO: Maybe modify and exclude props before delivery?
    return handoverEntity as HandoverDto;
  }
}
