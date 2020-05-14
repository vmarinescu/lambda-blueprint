import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export async function entrypoint (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  console.debug('Received event: %s', event)
  return { statusCode: 201, body: '' }
}
