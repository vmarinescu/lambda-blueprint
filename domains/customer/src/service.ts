import { CrudRepository, Error500 } from "@serverless-blueprint/core";
import { pipe } from "fp-ts/lib/pipeable"
import { fold } from "fp-ts/lib/Either"
import { v4 as uuidv4 } from "uuid";
import { CreateDto } from "./dtos/create-dto";
import { GetDto } from "./dtos/get-dto";
import { UpdateDto } from "./dtos/update-dto";
import { Customer } from "./entities/customer";

export class Service {
  private crudRepository: CrudRepository<Customer>;

  constructor(crudRepository: CrudRepository<Customer>) {
    this.crudRepository = crudRepository;
  }

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
          throw new Error500(); // Todo
        },
        // success handler
        async () => {
          await this.crudRepository.put(customer);
        },
      )
    );
    console.debug("201");
  }

  async deleteCustomer(id: string): Promise<void> {}

  // @ts-ignore
  async getCustomer(id: string): Promise<GetDto> {}

  async updateCustomer(id: string, updateDto: UpdateDto): Promise<void> {}
}
