/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    setupFilesAfterEnv: ["dotenv/config"],
    testEnvironment: "node",
    transform: {
        "^.+.tsx?$": ["jest-esbuild", {}]
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    }
};
