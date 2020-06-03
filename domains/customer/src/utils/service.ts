import { CrudRepository, Error404 } from "@lambda-blueprint/core";
import { v4 as uuidv4 } from "uuid";
import { CreateDto } from "../dtos/create-dto";
import { CustomerDto } from "../dtos/customer-dto";
import { UpdateDto } from "../dtos/update-dto";
import { Customer } from "../entities/customer";

export class Service {
  constructor(
    private crudRepository: CrudRepository<Customer>
  ) {}

  async createCustomer(createDto: CreateDto): Promise<string> {
    const date = new Date();

    const customer: Customer = {
      id: uuidv4(),
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      ...createDto,
    };
    await this.crudRepository.put(customer).catch((reason: any) => Promise.reject(reason));
    return customer.id;
  }

  async deleteCustomer(id: string): Promise<void> {
    const keys: Partial<Customer> = { id };
    return this.crudRepository.delete(keys);
  }

  async getCustomer(id: string): Promise<CustomerDto> {
    const keys: Partial<Customer> = { id };
    const customer = await this.crudRepository.get(keys).catch((reason: any) => Promise.reject(reason));
    if (!customer) { throw new Error404(); }
    const { createdAt, updatedAt, ...customerDto } = customer;
    return customerDto;
  }

  // Todo: dynamodb - updateItem vs getItem + putItem?
  // tslint:disable-next-line:no-empty
  async updateCustomer(id: string, updateDto: UpdateDto): Promise<void> {}
}
