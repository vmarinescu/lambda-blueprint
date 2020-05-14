import { CreateDto } from "./dtos/create-dto";
import { GetDto } from "./dtos/get-dto";

export class Service {
  async createHandover(createDto: CreateDto): Promise<void> {}

  // @ts-ignore
  async getHandover(id: string): Promise<GetDto> {}
}
