import { CrudRepository, Error404, Error500 } from "@serverless-blueprint/core";
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
      ...createDto,
    };
    await pipe(
      Customer.decode(customer),
      fold(
        // failure handler
        async () => {
          throw new Error500(); // Todo?
        },
        // success handler
        async () => {
          await this.crudRepository.put(customer);
        },
      )
    );
  }

  async deleteCustomer(id: string): Promise<void> {
    const keys: Partial<Customer> = { id: id };
    await this.crudRepository.delete(keys);
  }

  async getCustomer(id: string): Promise<GetDto> {
    const keys: Partial<Customer> = { id: id };
    const found = await this.crudRepository.get(keys);
    if (!found) { throw new Error404(); }

    const { createdAt, updatedAt, ...getDto } = found;
    return getDto;
  }

  async updateCustomer(id: string, updateDto: UpdateDto): Promise<void> {}
}
