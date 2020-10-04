# README

[![npm](https://img.shields.io/npm/v/@hauslo/pipeline-website-static?style=flat-square)](https://www.npmjs.com/package/@hauslo/pipeline-website-static)

## Options

- `public` is the path from the resource to the website public root. `public` defaults to `"public"` (ex: `"public"`, `"build/public"`).
- `region` is the aws region to deploy to. `region` defaults to `"eu-west-3"`.

## Infra

The underlying terraform module can be found at <https://github.com/hauslo/infra-website>

## Test

```bash
npm test
npm run coverage
```

## QA

```bash
npm run prettier
npm run prettier-apply
npm run lint
npm run lint-apply
```
