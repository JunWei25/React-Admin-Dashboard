import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
   schema: "https://api.crm.refine.dev/graphql",
   extensions:{
    codegen:{
        hooks:{
            afterOneFileWrite: ["eslint --fix", "prettier --write"],
        },
        generates:{
            "src/graphql/schema.types.ts":{
                plugins: ["typescript"],
                config:{
                    skipTypename: true,
                    enumAsTypes: true,
                    scalars:{
                        DateTime:{
                            input: "string",
                            output: "string",
                            format: "date-time"
                        },
                    }
                }
            },
            "src/graphql/types.ts":{
                preset: "import-types",
                documents: ["src/**/*.{ts,tsx}"],
                plugins: ["typescript-operations"],
                config:{
                    skipTypename: true,
                    enumAsTypes: true,
                    preResolveTypes: false,
                    useTypesImports: true,
                },
                presetConfig: {
                    typesPath: "./schema.types",
                },
            },
        },
    },
   }, 
};

export default config;