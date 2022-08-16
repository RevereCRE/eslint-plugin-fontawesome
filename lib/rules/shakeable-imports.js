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
    // Helpers
    //----------------------------------------------------------------------

    /** @param {import('estree').ImportDeclaration} node */
    function generateFixedImports(node) {
      const importedIcons = node.specifiers.map((spec) => {
        if (spec.type !== 'ImportSpecifier') {
          return null;
        }

        return `import { ${spec.imported.name}${
          spec.imported.name !== spec.local.name ? ` as ${spec.local.name}` : ''
        } } from '${node.source.value}/${spec.imported.name}';`;
      });

      return importedIcons.filter(Boolean).join('\n');
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ImportDeclaration(node) {
        // The problematic import style is `@fortawesome/free-solid-svg-icons`.
        // If we're not looking at that exact style import, don't try to lint.
        if (node.source.value.match(/^@fortawesome\/[\w-]+-icons$/g)) {
          context.report({
            node,
            messageId: 'badImport',
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
      },
    };
  },
};
