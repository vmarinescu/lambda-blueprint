import { Error404, Repository } from "@serverless-blueprint/core";
import { CustomerDto } from "./dtos/customer-dto";
import { CustomerEntity } from "./entities/customer-entity";

export class Service {
  private repository: Repository<CustomerEntity>;

  constructor(repository: Repository<CustomerEntity>) {
    this.repository = repository;
  }

  async createCustomer(customerDto: CustomerDto): Promise<void> {
    // Todo: Transform and validate the customerDto.
    const customerEntity = customerDto;
    await this.repository.create(customerEntity);
  }

  async getCustomer(id: string): Promise<CustomerDto> {
    const keys: Partial<CustomerEntity> = { id: id };
    const customerEntity = await this.repository.read(keys);

    if (!customerEntity) throw new Error404();

    // TODO: Maybe modify and exclude props before delivery?
    return customerEntity as CustomerDto;
  }
}
