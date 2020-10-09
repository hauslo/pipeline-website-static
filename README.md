# README

[![npm](https://img.shields.io/npm/v/@hauslo/pipeline-website-static?style=flat-square)](https://www.npmjs.com/package/@hauslo/pipeline-website-static)

This modules expects aws secrets to be present in the environment (`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables with valid credentials).

## Options

- `public` is the path from the resource to the website public root. `public` defaults to `"public"` (ex: `"public"`, `"build/public"`).
- `region` is the aws region to deploy to. `region` defaults to `"eu-west-3"`.

## Infra

The underlying terraform module can be found at <https://github.com/hauslo/infra-website> (can be tested locally)

## Test

No test until `@hauslo/pipeline@0.2.0`

## QA

```bash
npm run prettier
npm run prettier-apply
npm run lint
npm run lint-apply
```
