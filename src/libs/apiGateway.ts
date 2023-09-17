import type {
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
	Handler,
} from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> & {
	body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
	ValidatedAPIGatewayProxyEvent<S>,
	APIGatewayProxyResult
>;

export const formatJSONResponse = (response: Record<string, unknown>) => {
	return {
		statusCode: 200,
		headers: {
            // Required for CORS support to work
            'Access-Control-Allow-Origin': '*',
			"Access-Control-Allow-Headers": "*",
			"Access-Control-Allow-Methods" : "GET, POST, PATCH, DELETE",
            'Access-Control-Allow-Credentials': true
        },
		body: JSON.stringify(response),
	};
};

export const formatErrorResponse = (errCode: number, message: string) => {
	return {
		statusCode: errCode,
		headers: {
			// Required for CORS support to work
            'Access-Control-Allow-Origin': '*',
			"Access-Control-Allow-Headers": "*",
			"Access-Control-Allow-Methods" : "GET, POST, PATCH, DELETE",
            'Access-Control-Allow-Credentials': true
        },
		body: JSON.stringify({ error: message }),
	};
};
