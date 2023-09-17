import { Date, Document, Model, model, models, Schema } from "mongoose";

/*
	this is used whenever a user activity is logged in the database
*/
const userLogSchema: Schema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		datetime: {
			type: Date,
			required: true,
		},
		intent: { type: String },
		score: { type: Number },
		query: { type: String },
		response: { type: String },
	},
	{
		collection: "user_log",
	}
);

interface IUserLog extends Document {
	user: string;
	type: string;
	datetime: Date;
	intent: string;
	score: number;
	query: string;
	response: string;
}

export default (models.user_log
	? models.user_log
	: model("user_log", userLogSchema)) as Model<IUserLog>;
