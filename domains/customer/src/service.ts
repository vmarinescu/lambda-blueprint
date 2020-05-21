import { CrudRepository, Error404 } from "@serverless-blueprint/core";
import { pipe } from "fp-ts/lib/pipeable"
import { fold } from "fp-ts/lib/Either"
import { v4 as uuidv4 } from "uuid";
import { CreateDto } from "./dtos/create-dto";
import { GetDto } from "./dtos/get-dto";
import { UpdateDto } from "./dtos/update-dto";
import { Customer } from "./entities/customer";

export class Service {
  constructor(
    private crudRepository: CrudRepository<Customer>
  ) {}

  async createCustomer(createDto: CreateDto): Promise<void> {
    const date = new Date();

    const customer: Customer = {
      id: uuidv4(),
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      createdBy: "",
      updatedBy: "",
      ...createDto,
    };
    return this.saveCustomer(customer);
  }

  async deleteCustomer(id: string): Promise<void> {
    const keys: Partial<Customer> = { id: id };
    return this.crudRepository.delete(keys);
  }

  async getCustomer(id: string): Promise<GetDto> {
    const item = await this.findCustomer(id).catch((reason) => Promise.reject(reason));
    const { createdAt, updatedAt, ...getDto } = item;
    return getDto;
  }

  async updateCustomer(id: string, updateDto: UpdateDto): Promise<void> {
    const item = await this.findCustomer(id).catch((reason) => Promise.reject(reason));
    const date = new Date();

    const customer: Customer = {
      ...item,
      updatedAt: date.toISOString(),
      updatedBy: "",
      ...updateDto,
    };
    return this.saveCustomer(customer);
  }

  private async findCustomer(id: string): Promise<Customer> {
    const keys: Partial<Customer> = { id: id };
    const found = await this.crudRepository.find(keys).catch((reason) => Promise.reject(reason));
    if (!found) { throw new Error404(); }
    return found;
  }

  private async saveCustomer(customer: Customer): Promise<void> {
    return pipe(
      Customer.decode(customer),
      fold(
        // failure handler
        (reason) => Promise.reject(reason),
        // success handler
        (result) => this.crudRepository.save(result),
      ),
    );
  }
}
