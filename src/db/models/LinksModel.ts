import { Date, Document, Model, model, models, Schema } from "mongoose";

/*
    this is used whenever a user activity is logged in the database
*/
const linkSchema: Schema = new Schema(
    {
        long_url: {
            type: String,
            required: true,
        },
        short_url: {
            type: String,
            required: true,
        },
        creation_date:
        {
            type: Date,
        }
    },
    {
        collection: "links",
    }
);

interface ILinks extends Document {
    long_url: string;
    short_url: string;
    creation_date : Date;
   // ip_address : String,
}

export default (models.links
    ? models.links
    : model("links", linkSchema)) as Model<ILinks>;
