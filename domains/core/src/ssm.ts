// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SSM.html

import * as SSM from "aws-sdk/clients/ssm";
const ssm = new SSM({});

/**
 * Retrieve information about ssm-parameters behind a specific path.
 *
 * @param path e.g. '/qa'
 */
export const getParametersByPath = async (path: string): Promise<Record<string, string>> => {
  const params: SSM.Types.GetParametersByPathRequest = {
    Path:           path,
    WithDecryption: true,
  };
  try {
    const response = await ssm.getParametersByPath(params).promise();
    const result: Record<string, string> = {};
    // @ts-ignore
    response.Parameters.forEach((parameter) => { result[parameter.Name] = parameter.Value; });
    return result;
  } catch (error) {
    console.error(error); // Todo?
    throw error;
  }
};
