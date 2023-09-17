export const createLinkSchema = {
    type: "object",
    properties: {
        long_url: { type: "string" }
    },
    required: ["long_url"],
} as const;

export const findLinkSchema = {
    type: "object",
    properties: {
        short_url: { type: "string" }
    },
    required: ["short_url"],
} as const;

export const searchLinkSchema = {
    type: "object",
    properties: {
        long_url: { type: "string" }
    },
    required: ["long_url"],
} as const;

export const updateLinkSchema = {
    type: "object",
    properties: {
        _id: { type: "string" },
        short_url: { type: "string" },
        new_short_url: { type: "string" }
    },
    required: ["_id","short_url","new_short_url"],
} as const;