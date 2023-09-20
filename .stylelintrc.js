module.exports = {
    customSyntax: 'postcss-html',
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-recess-order',
        'stylelint-config-recommended-vue',
    ],
    overrides: [
        {
            files: ['*.vue', '**/*.vue'],
            extends: [
                'stylelint-config-recommended-scss',
                'stylelint-config-recommended-vue',
            ],
        },
    ],
    plugins: [],
    ignoreFiles: ['**/node_modules/**', '**/.nuxt/**', '**/.output/**'],
    rules: {
        'scss/at-rule-no-unknown': true,
        'scss/comment-no-empty': null,
        'scss/operator-no-newline-after': null,
        'block-no-empty': null,
        'color-hex-length': 'short',
        'color-no-invalid-hex': true,
        'length-zero-no-unit': true,
        'media-feature-name-no-vendor-prefix': true,
        'shorthand-property-no-redundant-values': true,
        'no-invalid-position-at-import-rule': null,
        'no-irregular-whitespace': null,
        'selector-class-pattern': null,
        'property-no-unknown': null,
        'order/properties-order': null,
        // ::v-deepエラー回避
        'selector-pseudo-class-no-unknown': null,
        'selector-pseudo-element-no-unknown': null,
    },
}
