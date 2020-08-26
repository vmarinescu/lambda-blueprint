// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SSM.html
import * as SSM from "aws-sdk/clients/ssm";

export const BATCH_SIZE = 10;
export class ParameterStore {
  private ssm: SSM;

  constructor(options?: SSM.Types.ClientConfiguration) {
    this.ssm = new SSM(options);
  }

  async getParametersByPath(path: string): Promise<Record<string, string>> {
    try {
      const result: Record<string, string> = {};
      let nextToken: SSM.Types.NextToken | undefined;
      do{
        // noinspection JSUnusedAssignment
        const request: SSM.Types.GetParametersByPathRequest = {
          Path:           path,
          WithDecryption: true,
          NextToken: nextToken
        };
        const response = await this.ssm.getParametersByPath(request).promise();

        if (response.Parameters) {
          // @ts-ignore
          response.Parameters.forEach((parameter) => {result[parameter.Name] = parameter.Value;});
        }
        nextToken = response.NextToken;
      } while (nextToken)

      return result;
    } catch (error) {
      console.error(error); // Todo
      throw error;
    }
  }

  async deleteParameters(parameters: string[]): Promise<void> {
    const paramsCopy = JSON.parse(JSON.stringify(parameters));
    try {
      do {
        const batch = paramsCopy.splice(0, BATCH_SIZE);
        const request: SSM.Types.DeleteParametersRequest = {
          Names: batch,
        };
        await this.ssm.deleteParameters(request).promise();
      } while (parameters.length > 0);
    } catch (error) {
      console.error(error); // Todo
      throw error;
    }
  }
}
