module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:react/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'react-hooks'
    ],
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        "max-len": [
            2,
            {
                "ignorePattern": "d=\"([\\s\\S]*?)\"",
                "code": 120
            }
        ],
        "padding-line-between-statements": [
            "error",
            {
                "blankLine": "always",
                "prev": [
                    "const",
                    "let",
                    "var"
                ],
                "next": "*"
            },
            {
                "blankLine": "any",
                "prev": [
                    "const",
                    "let",
                    "var"
                ],
                "next": [
                    "const",
                    "let",
                    "var"
                ]
            },
            {
                "blankLine": "always",
                "prev": [
                    "block",
                    "block-like",
                    "multiline-block-like",
                    "multiline-expression",
                    "multiline-const",
                    "multiline-let",
                    "multiline-var"
                ],
                "next": "return"
            },
            {
                "blankLine": "any",
                "prev": [
                    "singleline-const",
                    "singleline-let",
                    "singleline-var"
                ],
                "next": "*"
            },
            {
                "blankLine": "always",
                "prev": "*",
                "next": "if"
            }
        ],
        "@typescript-eslint/comma-dangle": [
            "error",
            "never"
        ],
        "react/function-component-definition": [2, {
            "namedComponents": "arrow-function",
            "unnamedComponents":  "arrow-function"
        }],
        "no-restricted-exports": ["off"],
        "react/react-in-jsx-scope": "off",
        "react/require-default-props": "off",
        "@typescript-eslint/indent": [
            "error",
            4,
            {
                "ignoredNodes": [
                    "JSXElement",
                    "JSXElement > *",
                    "JSXAttribute",
                    "JSXIdentifier",
                    "JSXNamespacedName",
                    "JSXMemberExpression",
                    "JSXSpreadAttribute",
                    "JSXExpressionContainer",
                    "JSXOpeningElement",
                    "JSXClosingElement",
                    "JSXText",
                    "JSXEmptyExpression",
                    "JSXSpreadChild",
                    "JSXOpeningFragment",
                    "JSXClosingFragment"
                ]
            }
        ],
        "react/no-array-index-key": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "react-hooks/exhaustive-deps": "warn",
        "linebreak-style": "off",
        "@typescript-eslint/no-return-await": "off",
        "@typescript-eslint/return-await": "off"
    },
};
