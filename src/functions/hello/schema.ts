export const helloSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
    },
    required: ["name"],
} as const;

export const createUserSchema = {
    type: "object",
    properties: {
        longurl: { type: "string" }
    },
    required: ["longurl"]
} as const;