"use strict";

module.exports = {
  "extends": "stylelint-config-standard",
  "syntax": "scss",
  "rules": {
    "property-no-unknown": [true, {
      "ignoreProperties": ["composes"]
    }],

    // too annoying during development
    //
    "block-no-empty": null,

    // does not make sense when you comment a line of code in a block
    "comment-empty-line-before": null,

    // atom command to comment code don't add space, so super annoying...
    "comment-whitespace-inside": null,

    "rule-non-nested-empty-line-before": null,

    "rule-nested-empty-line-before": null,

    "indentation": null,

    "indentation": null,

    "selector-list-comma-newline-after": null,

    "block-closing-brace-newline-before": null,

    "at-rule-empty-line-before": null,

    "selector-pseudo-class-no-unknown": null,

  }
};
