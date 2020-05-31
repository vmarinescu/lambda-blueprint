// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SSM.html

import * as SSM from "aws-sdk/clients/ssm";
const ssm = new SSM({});

export const loadParams = async (env: string): Promise<void> => {};
