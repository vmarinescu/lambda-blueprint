import { CreateDto } from "./dtos/create-dto";
import { GetDto } from "./dtos/get-dto";
import { UpdateDto } from "./dtos/update-dto";

export class Service {
  async createCustomer(createDto: CreateDto): Promise<void> {}

  async deleteCustomer(id: string): Promise<void> {}

  // @ts-ignore
  async getCustomer(id: string): Promise<GetDto> {}

  async updateCustomer(id: string, updateDto: UpdateDto): Promise<void> {}
}
