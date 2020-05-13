import { Error404, Repository } from "@serverless-blueprint/core";
import { CreateCustomerDto } from "./dtos/customer-dto";
import { Customer } from "./entities/customer-entity";

export class Service {
  private repository: Repository<Customer>;

  constructor(repository: Repository<Customer>) {
    this.repository = repository;
  }

  async createCustomer(customerDto: CreateCustomerDto): Promise<void> {
    // Todo: Transform and validate the customerDto.
    const customerEntity = customerDto;
    await this.repository.create(customerEntity);
  }

  async getCustomer(id: string): Promise<CreateCustomerDto> {
    const keys: Partial<Customer> = { id: id };
    const customerEntity = await this.repository.read(keys);

    if (!customerEntity) throw new Error404();

    // TODO: Maybe modify and exclude props before delivery?
    return customerEntity as CreateCustomerDto;
  }
}
