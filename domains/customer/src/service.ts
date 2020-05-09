import { Error404, getEnv, Repository } from "@serverless-blueprint/core";
import { CustomerDto } from "./dtos/customer-dto";
import { CustomerEntity } from "./entities/customer-entity";
import { Key } from "./key";

export class Service {
  private repository: Repository<CustomerEntity>;

  constructor() {
    const tableName = getEnv<string>(Key.CUSTOMER_TABLE, { required: true })!;
    this.repository = new Repository(tableName);
  }

  async createCustomer(dto: CustomerDto): Promise<void> {}

  async getCustomer(id: string): Promise<CustomerDto> {
    const keys: Partial<CustomerEntity> = { id: id };
    const customerEntity = await this.repository.read(keys);

    if (!customerEntity) throw new Error404();

    // TODO: Maybe modify and exclude props before delivery?
    return customerEntity as CustomerDto;
  }
}
