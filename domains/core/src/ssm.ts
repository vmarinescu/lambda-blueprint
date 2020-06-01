// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SSM.html

import * as SSM from "aws-sdk/clients/ssm";

let ssm: SSM;

export const initialize = (options?: SSM.Types.ClientConfiguration): void => {
  ssm = new SSM(options);
};

export const getParametersByPath = async (path: string): Promise<Record<string, string>> => {
  const request: SSM.Types.GetParametersByPathRequest = {
    Path:           path,
    WithDecryption: true,
  };
  try {
    const response = await ssm.getParametersByPath(request).promise();
    const result: Record<string, string> = {};
    // @ts-ignore
    response.Parameters.forEach((parameter) => { result[parameter.Name] = parameter.Value; });
    return result;
  } catch (error) {
    console.error(error); // Todo?
    throw error;
  }
};
