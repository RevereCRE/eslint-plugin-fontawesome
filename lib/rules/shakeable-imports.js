/**
 * @fileoverview Ensures Font Awesome icon imports can be tree-shaken
 * @author Revere CRE
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: `problem`,
    docs: {
      description: 'Ensures Font Awesome icon imports can be tree-shaken',
      recommended: true,
      url: 'https://github.com/RevereCRE/eslint-plugin-fontawesome',
    },
    fixable: `code`,
    hasSuggestions: true,
    schema: [],
    messages: {
      badImport: `Avoid using Font Awesome icon imports that cannot be tree-shaken.`,
      fixImport: `Seperates Font Awesome imports into tree-shakeable ones.`,
    },
  },

  create(context) {
    //----------------------------------------------------------------------
    // Variables
    //----------------------------------------------------------------------

    const isTypeScript = context.parserPath.includes(
      'node_modules/@typescript-eslint/parser'
    );

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    /** @param {import('estree').ImportDeclaration} node */
    function generateFixedImports(node) {
      const nonIconImports = node.specifiers
        .filter((spec) => {
          return (
            spec.type === 'ImportSpecifier' &&
            !spec.imported.name.startsWith('fa')
          );
        })
        .map((spec) => {
          if (spec.type !== 'ImportSpecifier') {
            return null;
          }

          return `import ${isTypeScript ? 'type ' : ''}{ ${spec.imported.name}${
            spec.imported.name !== spec.local.name
              ? ` as ${spec.local.name}`
              : ''
          } } from '${node.source.value}';`;
        });

      const importedIcons = node.specifiers
        .filter((spec) => {
          return (
            spec.type === 'ImportSpecifier' &&
            spec.imported.name.startsWith('fa')
          );
        })
        .map((spec) => {
          if (spec.type !== 'ImportSpecifier') {
            return null;
          }

          return `import { ${spec.imported.name}${
            spec.imported.name !== spec.local.name
              ? ` as ${spec.local.name}`
              : ''
          } } from '${node.source.value}/${spec.imported.name}';`;
        });

      return [...nonIconImports, ...importedIcons].filter(Boolean).join('\n');
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ImportDeclaration(node) {
        // The problematic import style is `@fortawesome/free-solid-svg-icons`.
        // If we're not looking at that exact style import, don't try to lint.
        if (node.source.value.match(/^@fortawesome\/[\w-]+-icons$/g)) {
          const hasIconImport = node.specifiers.some(
            (spec) =>
              spec.type === 'ImportSpecifier' &&
              spec.imported.name.startsWith('fa')
          );

          if (hasIconImport) {
            context.report({
              node,
              messageId: 'badImport',
              fix: (fixer) =>
                fixer.replaceText(node, generateFixedImports(node)),
              suggest: [
                {
                  messageId: 'fixImport',
                  fix: (fixer) => {
                    return fixer.replaceText(node, generateFixedImports(node));
                  },
                },
              ],
            });
          }
        }
      },
    };
  },
};
