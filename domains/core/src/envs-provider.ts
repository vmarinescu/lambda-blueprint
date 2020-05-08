export interface GetEnvOptions<T> {
  required?: boolean;
}

export function getEnv<T = any>(
  key: Key | string,
  options: GetEnvOptions<T> = { required: false }
): T | undefined {
  const value = process.env[key];
  if (value == null && options.required) {
    throw Error(`Missing value for required env-var: ${key}`);
  }
  try {
    return JSON.parse(value as any) as T; // Convert to primitive or non-primitive.
  } catch (error) {
    return (value as any) as T;
  }
}

export enum Env {
  TEST = "test",
  PROD = "prod",
}

export enum Key {
  DYNAMODB_ENDPOINT = "DYNAMODB_ENDPOINT",
  ALLOWED_ORIGINS   = "ALLOWED_ORIGINS",
  ENV = "ENV",
}
