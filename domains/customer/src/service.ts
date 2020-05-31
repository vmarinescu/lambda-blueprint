import { CrudRepository, Error404 } from "@serverless-blueprint/core";
import { v4 as uuidv4 } from "uuid";
import { CreateDto } from "./create-dto";
import { CustomerDto } from "./customer-dto";
import { UpdateDto } from "./update-dto";
import { Customer } from "./customer";

export class Service {
  constructor(
    private crudRepository: CrudRepository<Customer>
  ) {}

  async createCustomer(createDto: CreateDto): Promise<CustomerDto> {
    const date = new Date();

    const customer: Customer = {
      id: uuidv4(),
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      ...createDto,
    };
    await this.crudRepository.put(customer).catch((reason: any) => Promise.reject(reason));
    const { createdAt, updatedAt, ...customerDto } = customer;
    return customerDto;
  }

  async deleteCustomer(id: string): Promise<void> {
    const keys: Partial<Customer> = { id: id };
    return this.crudRepository.delete(keys);
  }

  async getCustomer(id: string): Promise<CustomerDto> {
    const keys: Partial<Customer> = { id: id };
    const customer = await this.crudRepository.get(keys).catch((reason: any) => Promise.reject(reason));
    if (!customer) { throw new Error404(); }
    const { createdAt, updatedAt, ...customerDto } = customer;
    return customerDto;
  }

  async updateCustomer(id: string, updateDto: UpdateDto): Promise<void> {
    const keys: Partial<Customer> = { id: id };
    const date = new Date();

    const customer: Partial<Customer> = { updatedAt: date.toISOString(), ...updateDto };
    return this.crudRepository.update(keys, customer);
  }
}
