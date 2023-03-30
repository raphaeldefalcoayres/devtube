# DevTube

## _Important information for application, you must follow each step by step._

Ensure that all extensions are successfully installed, such as:

- Eslint
- Prettier

## Start in application

- Install [nvm](https://github.com/nvm-sh/nvm) for node version management and install _"lts/gallium"_ version.
- After installing the "lts/gallium" node version, you must run the following command every time you start the application to use the suggested node version:

```sh
nvm use
```

- For package management, [pnpm](https://pnpm.io/installation) should be used as a matter of standard and there are no divergences.
- After installing pnpm and nvm, just run the following command to install the dependencies and husky:

```sh
pnpm first-install
```

- And finally, to run the project locally, just run the following command:

```sh
pnpm dev
```

## GitFlow

The default branch is "master", where the "develop" branch will be responsible for all the features/bugs/fix that will go to the production release, so all development branches must start from develop with the following standards:

- feature/nameoftask: Something new
- bug/nameofbug: Something that worked and stopped picking up.
- All "commits" must follow the pattern like: feat, test, chore, ci, build, etc... so we can standardize the "commits" and find it easier in histories.

After development, you should point the "Pull Request" to develop only after carrying out the tests with the team.

## Workflow

Ensure that during development everything is within the application standards to facilitate the Code Review and ensure that unit tests are at least 85%.
