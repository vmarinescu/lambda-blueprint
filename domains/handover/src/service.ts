import { CreateDto } from "./dtos/create-dto";
import { GetDto } from "./dtos/get-dto";
import { UpdateDto } from "./dtos/update-dto";

export class Service {
  async createHandover(createDto: CreateDto): Promise<void> {}

  async deleteHandover(id: string): Promise<void> {}

  // @ts-ignore
  async getHandover(id: string): Promise<GetDto> {}

  async updateHandover(id: string, updateDto: UpdateDto): Promise<void> {}
}
