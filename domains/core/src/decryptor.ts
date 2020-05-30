import * as KMS from "aws-sdk/clients/kms";
const kms = new KMS({});

const CIPHER_PREFIX = "{cipher}";

export async function decrypt(env: Record<string, string>): Promise<Record<string, string>> {
  await Promise.all(Object.entries(env).map(async ([key, value]) => {
    if (value.includes(CIPHER_PREFIX)) {
      const blob = Buffer.from(value.replace(CIPHER_PREFIX, ""), "base64");
      const response = await kms.decrypt({ CiphertextBlob: blob }).promise().catch((reason) => Promise.reject(reason));

      if (response.Plaintext) { env[key] = response.Plaintext.toString(); }
    }
  }));
  return env;
}
