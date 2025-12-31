/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-clean-order'],
  rules: {
    'declaration-block-no-redundant-longhand-properties': [
      true,
      { ignoreShorthands: ['/flex/', '/grid/'] },
    ],
    'font-family-name-quotes': 'always-where-recommended',
    'comment-empty-line-before': [
      'always',
      {
        ignoreComments: ['/^#endregion/'],
        except: ['first-nested'],
        ignore: ['after-comment', 'stylelint-commands'],
      },
    ],
    'number-max-precision': 6,
    'selector-class-pattern': null,
  },
}
