# Ensures Font Awesome icon imports can be tree-shaken (rule-fontawesome-shakeable-imports)

## Rule Details

Examples of **incorrect** code for this rule:

```js
import { faCoffee, faTimes } from '@fortawesome/free-solid-svg-icons';
```

Examples of **correct** code for this rule:

```js
import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
```
