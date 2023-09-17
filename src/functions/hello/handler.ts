import "source-map-support/register";
import { formatErrorResponse, ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { createUserSchema, helloSchema } from "./schema";
import connectMongo from "@db/connectMongo";
import AwsService from "src/services/AwsService";

const awsService = AwsService();

const hello: ValidatedEventAPIGatewayProxyEvent<typeof helloSchema> = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await connectMongo();

    console.log(event.body);


    try {
        // Your Code Here

        return formatJSONResponse({
            message: `Hi ${event.body.name}, Hello World!`,
        });
    } catch (e) {
        console.log(e);
        return formatErrorResponse(500, "Internal Server Error");
    }
};

const createUser: ValidatedEventAPIGatewayProxyEvent<typeof createUserSchema> = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await connectMongo();

    console.log(event.body);

    let url = event.body.longurl;

    /* 
    LONG URL
    SHORT URL
    VALIDATION
    CHECK
    */

    let isValid = true;

    if (!isValid) {
        return formatErrorResponse(403, "URL Invalid");
    }

    let shortURL = "stan.ly/qwerty"

    return formatJSONResponse({
        shortURL: shortURL
    })
}

export const HELLO = middyfy(hello);
export const CREATEUSER = middyfy(createUser);
