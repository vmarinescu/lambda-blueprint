import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { pipe } from "fp-ts/lib/pipeable";
import { fold } from "fp-ts/lib/Either";
import { CrudRepository } from "@serverless-blueprint/core";
import { CreateDto } from "./dtos/create-dto";
import { Handover } from "./entities/handover";
import { Service } from "./service";

const tableName  = process.env.TABLE_NAME!;
const repository = new CrudRepository<Handover>({ tableName: tableName });
const service    = new Service(repository);

export async function entrypoint(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  console.debug("Received handover-event: %s", event);

  const body = event.body;
  if (body == null) { return { statusCode: 400, body: "Body is null." }; }

  const createDto = JSON.parse(body);
  try {
    await pipe(
      CreateDto.decode(createDto), // ---> Unknown props will be stripped.
      fold(
        // failure handler
        async (reason) => {
          console.debug(reason);
          return {
            statusCode: 400,
            body:       "", // Todo: Show reasons To our Consumers.
          };
        },
        // success handler
        async (result) => {
          console.debug(result);
          const handoverDto = await service.createHandover(result);
          return {
            statusCode: 201,
            body:       JSON.stringify(handoverDto),
          };
        },
      ),
    );
    return { statusCode: 500, body: "" }; // ??
  } catch (reason) {
    return { statusCode: 500, body: "" };
    // Todo: ...
  }
}
