This project was structured as Mono-Repository and was bootstrapped with [lerna](https://github.com/lerna/lerna).

## Prerequisites

This project requires the following tools:

- [Node.js](https://nodejs.org/en/download) (v12)

- [aws-cli](https://docs.aws.amazon.com/cli/index.html)
- [aws-sam](https://docs.aws.amazon.com/serverless-application-model/index.html)

## Available scripts

This project provides the following scripts:

```bash
npm install
```

Installs all devDependencies.

```bash
npm run compile
```
Installs all runDependencies in all domains and compiles all domains (in dependency-order).

```bash
npm run bundler
```

Runs `compile` in all domains via [PRE-hook](https://docs.npmjs.com/misc/scripts), and then runs [webpack](https://www.npmjs.com/package/webpack) to bundle all lambda-functions. TODO

---

For tests [jest](https://www.npmjs.com/package/jest) and [ts-jest](https://www.npmjs.com/package/ts-jest) are used.

```bash
npm run test:unit
```

Runs all unit-tests (test-files with `unit`-suffix) in the project.

```bash
npm run test:int
```

Runs all int-tests (test-files with `int`-suffix)   in the project.
Uses [dotenv](https://www.npmjs.com/package/dotenv) to run `.env`-file for all int-tests. Uses [dynamodb-local](https://hub.docker.com/r/amazon/dynamodb-local) to run dynamodb for all int-tests.

```bash
npm run test:e2e
```

Runs all e2e-tests (test-files with `e2e`-suffix)   in the project.

**Tip:**
To run *-tests for a specific domain, simply go into its package and run the same test-commands there.

---

```bash
npm run tslint
```

Runs [tslint](https://www.npmjs.com/package/tslint)     in the project and automatically fixes your prgramming-issues.

```bash
npm run prettier
```

Runs [prettier](https://www.npmjs.com/package/prettier) in the project and automatically fixes your formatting-issues.

### [git-hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

This project uses [husky](https://www.npmjs.com/package/husky) and [lint-staged](https://www.npmjs.com/package/lint-staged) to run `tslint` and `prettier` on staged files in a `pre-commit` phase, so that only clean code is checked-in.

### [aws-cdk](https://aws.amazon.com/cdk)

Cloud-deployments/-removals are done with the `aws-cdk`.

#### `npm run deploy:{ENV}`

```bash
npm run deploy:test # Deploys the backend in the test-env.
npm run deploy:prod # ...
```

**Tip:**
For CI/CD append `approval` flag: `npm run deploy:test -- --require-approval never`. See [here](https://docs.aws.amazon.com/cdk/latest/guide/tools.html).

#### `npm run remove:{ENV}`

```bash
npm run remove:test # Removes the backend in the test-env.
npm run remove:prod # ...
```

**Tip:**
For CI/CD append `force` flag: `npm run remove:test -- --force`. See [here](https://docs.aws.amazon.com/cdk/latest/guide/tools.html).

### [aws-sam](https://aws.amazon.com/serverless/sam) and aws-cdk?

For more info how to test locally with `aws-sam` and `aws-cdk` please refer to the following [link](https://docs.aws.amazon.com/cdk/latest/guide/tools.html#sam).

```bash
cdk synth --no-staging > template.yaml # ---> Depends on 'npm run bundle'
sam local invoke createCustomerFunctionXXXXXXXX --event domains/customer/events/create-event.json
```

Alternatively, you can also run:

```bash
cdk synth --no-staging > template.yaml # ---> Depends on 'npm run bundle'
sam local start-api
```

`aws-sam` automatically finds any lambda-functions within your `template.yaml` which have HTTP event-sources defined. Then, it mounts them at the defined HTTP paths.

## Further links

For more info how to setup and build serverless projects please refer to the following links.

- https://serverless-stack.com
