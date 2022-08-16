# `@reverecre/eslint-plugin-fontawesome`

Ensures proper usage of Font Awesome imports

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@reverecre/eslint-plugin-fontawesome`:

```sh
npm install @reverecre/eslint-plugin-fontawesome --save-dev
```

## Usage

Add `@reverecre/fontawesome` to the plugins section of your `.eslintrc`
configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["@reverecre/fontawesome"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@reverecre/fontawesome/shakeable-imports": 2
  }
}
```

## Supported Rules

### `@reverecre/fontawesome/shakeable-imports`

Ensures all Font Awesome icon imports can be tree shaken by Next.js.
