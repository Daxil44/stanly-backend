import { handlerPath } from "@libs/handlerResolver";
import { createUserSchema, helloSchema } from "./schema";

export const helloWorld = {
    handler: `${handlerPath(__dirname)}/handler.HELLO`,
    events: [
        {
            http: {
                method: "post",
                path: "hello",
                cors: true,
                request: {
                    schema: {
                        "application/json": helloSchema,
                    },
                },
            },
        },
    ],
};

export const createUser = {
    handler: `${handlerPath(__dirname)}/handler.CREATEUSER`,
    events: [
        {
            http: {
                method: "post",
                path: "user/create",
                cors: true,
                request: {
                    schema: {
                        "application/json": createUserSchema
                    }
                }
            }
        }
    ]
}
