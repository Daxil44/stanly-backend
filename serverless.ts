import type { AWS } from "@serverless/typescript";
import { helloWorld, createUser, getAllLinks, createLink, findLink, searchLink, updateLink } from "@functions/index";

const serverlessConfiguration: AWS = {
    service: "stanly-backend",
    //frameworkVersion: "2",
    custom: {
        webpack: {
            webpackConfig: "./webpack.config.js",
            includeModules: {
                forceExcludes: "aws-sdk",
            },
        },
        AWS_CREDENTIALS: {
            dev: "${ssm:APPLICATION_CREDENTIALS_AWS}",
            prod: "${ssm:APPLICATION_CREDENTIALS_AWS}",
        },
    },
    plugins: ["serverless-webpack", "serverless-offline"],
    provider: {
        name: "aws",
        runtime: "nodejs14.x",
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        stage: "${opt:stage, 'dev'}",
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
            AWS_APPLICATION_CREDENTIALS: "${self:custom.AWS_CREDENTIALS.${self:provider.stage}}",
        },
        lambdaHashingVersion: "20201221",
    },
    // import the function via paths
    functions: { helloWorld, createUser, getAllLinks, createLink,  findLink, searchLink, updateLink},
};

module.exports = serverlessConfiguration;
