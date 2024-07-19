# Learning - TypeORM, monorepo, IOC and JEST

This is a simple project intended to learn and practice more about OOP, monorepos, TypeORM, IOC (using Inversify) and JEST (Testing).

Steps to run this project:

1. Run `yarn i` command
2. Setup database settings inside `data-source.ts` file -> I've created a docker image of postgres (downloaded in docker hub).
3. Run `yarn run start:dev` command

## linter

I've created some scripts in .lintstagedrc.json, you can change it to your need.
I've also added a hook with Husky (only added pre-commit and pre-push hooks)

---

I'm also still implementing the monorepo (DONE) scheme and tests.
