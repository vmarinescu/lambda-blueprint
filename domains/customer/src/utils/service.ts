import { CrudRepository, EntityNotFoundError, Error404 } from "@serverless-blueprint/core";
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
    const keys: Partial<Customer> = { id: id };
    return this.crudRepository.delete(keys);
  }

  async getCustomer(id: string): Promise<CustomerDto> {
    const keys: Partial<Customer> = { id: id };
    const customer = await this.crudRepository.get(keys)
      .catch((reason: any) => {
        if (reason.constructor === EntityNotFoundError) { throw new Error404(); }
        throw reason;
      });
    const { createdAt, updatedAt, ...customerDto } = customer;
    return customerDto;
  }

  async updateCustomer(id: string, updateDto: UpdateDto): Promise<void> {
    const keys: Partial<Customer> = { id: id };
    const date = new Date();

    const customer: Partial<Customer> = { updatedAt: date.toISOString(), ...updateDto };
    await this.crudRepository.update(keys, customer)
      .catch((reason: any) => {
        if (reason.constructor === EntityNotFoundError) { throw new Error404(); }
        throw reason;
      });
  }
}
