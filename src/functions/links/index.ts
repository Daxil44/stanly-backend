import { handlerPath } from "@libs/handlerResolver";
import { createLinkSchema, findLinkSchema, searchLinkSchema, updateLinkSchema } from "./schema";


export const getAllLinks = {
    handler: `${handlerPath(__dirname)}/handler.GET_ALL_LINKS`,
    events: [
        {
            http: {
                method: "get",
                path: "links",
                cors: true,
            },
        },
    ],
};

export const createLink = {
    handler: `${handlerPath(__dirname)}/handler.CREATE_LINK`,
    events: [
        {
            http: {
                method: "post",
                path: "link",
                cors: true,
                request: {
                    schema: {
                        "application/json": createLinkSchema,
                    },
                },
            },
        },
    ],
};

export const searchLink = {
    handler: `${handlerPath(__dirname)}/handler.SEARCH_LINK`,
    events: [
        {
            http: {
                method: "post",
                path: "searchLinks",
                cors: true,
                request: {
                    schema: {
                        "application/json": searchLinkSchema,
                    },
                    
                },
                
            },
        },
    ],
};

export const findLink = {
    handler: `${handlerPath(__dirname)}/handler.FIND_LINK`,
    events: [
        {
            http: {
                method: "post",
                path: "find",
                cors: true,
                request: {
                    schema: {
                        "application/json": findLinkSchema,
                    },
                    
                },
                
            },
        },
    ],
};

export const updateLink = {
    handler: `${handlerPath(__dirname)}/handler.UPDATE_LINK`,
    events: [
        {
            http: {
                method: "post",
                path: "updateLink",
                cors: true,
                request: {
                    schema: {
                        "application/json": updateLinkSchema,
                    },
                    
                },
                
            },
        },
    ],
};