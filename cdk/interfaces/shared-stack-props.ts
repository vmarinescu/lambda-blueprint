export type Env = "qa" | "prod";

export interface SharedStackProps {
  env: Env;
  // ...
}
