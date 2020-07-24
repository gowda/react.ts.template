module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json'
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'airbnb-typescript'
    ],
    rules: {
        "import/no-extraneous-dependencies": [
            "error",
            {
                "devDependencies": true
            }
        ]
    }
}
