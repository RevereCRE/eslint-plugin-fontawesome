/* eslint-disable node/no-unpublished-require */
/**
 * @fileoverview Ensures Font Awesome icon imports can be tree-shaken
 * @author Revere CRE
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/shakeable-imports'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('shakeable-imports', rule, {
  valid: [
    {
      parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
      code: `import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';`,
    },
    {
      parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
      code: `import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';`,
    },
    {
      parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
      code: `import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';`,
    },
  ],

  invalid: [
    {
      parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
      code: `import { faCoffee } from '@fortawesome/free-solid-svg-icons';`,
      errors: [
        {
          messageId: 'badImport',
          suggestions: [
            {
              output: `import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';`,
            },
          ],
        },
      ],
    },
    {
      parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
      code: `import { faCoffee, faTimes } from '@fortawesome/free-solid-svg-icons';`,
      errors: [
        {
          messageId: 'badImport',
          suggestions: [
            {
              output: `import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';\nimport { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';`,
            },
          ],
        },
      ],
    },
    {
      parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
      code: `import { faCoffee as coffeeIcon } from '@fortawesome/free-solid-svg-icons';`,
      errors: [
        {
          messageId: 'badImport',
          suggestions: [
            {
              output: `import { faCoffee as coffeeIcon } from '@fortawesome/free-solid-svg-icons/faCoffee';`,
            },
          ],
        },
      ],
    },
    {
      parser: require.resolve('@typescript-eslint/parser'),
      code: `import { faCoffee } from '@fortawesome/free-solid-svg-icons';`,
      errors: [
        {
          messageId: 'badImport',
          suggestions: [
            {
              output: `import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';`,
            },
          ],
        },
      ],
    },
    {
      parser: require.resolve('@typescript-eslint/parser'),
      code: `import { faCoffee, faTimes } from '@fortawesome/free-solid-svg-icons';`,
      errors: [
        {
          messageId: 'badImport',
          suggestions: [
            {
              output: `import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';\nimport { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';`,
            },
          ],
        },
      ],
    },
    {
      parser: require.resolve('@typescript-eslint/parser'),
      code: `import { faCoffee as coffeeIcon } from '@fortawesome/free-solid-svg-icons';`,
      errors: [
        {
          messageId: 'badImport',
          suggestions: [
            {
              output: `import { faCoffee as coffeeIcon } from '@fortawesome/free-solid-svg-icons/faCoffee';`,
            },
          ],
        },
      ],
    },
  ],
});
