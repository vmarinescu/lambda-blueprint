// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SSM.html

import * as SSM from "aws-sdk/clients/ssm";
const ssm = new SSM({});

// @ts-ignore
export const getParams = async (env: string): Promise<Record<string, string>> => {};
