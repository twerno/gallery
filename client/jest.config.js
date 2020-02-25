module.exports = {
    "verbose": true,

    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ["<rootDir>/src"],

    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },

    "collectCoverageFrom": [
        "**/*.{js,jsx}",
        "!**/node_modules/**",
        "!**/vendor/**"
    ],

    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect",
        "<rootDir>/src/test/setup.ts"
    ],

    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

    // Module file extensions for importing
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

    moduleDirectories: ["node_modules", "src"],

    "moduleNameMapper": {
        "^main/([./a-zA-Z0-9$_-]+)$": "<rootDir>/src/main/$1",
        "@shared/$": "<rootDir>/../server/shared/lib",
    },

    "snapshotSerializers": [
        "enzyme-to-json/serializer"
    ]

};