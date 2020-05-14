import { CreateDto } from './dtos/create-dto'
import { GetDto } from './dtos/get-dto'

export class Service {
  async createCustomer (createDto: CreateDto): Promise<void> {}

  // @ts-ignore
  async getCustomer (id: string): Promise<GetDto> {}
}
