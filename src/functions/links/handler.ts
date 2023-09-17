import connectMongo from "@db/connectMongo";
import LinksModel from "@db/models/LinksModel";
import {
  ValidatedEventAPIGatewayProxyEvent,
  formatErrorResponse,
  formatJSONResponse,
} from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { createLinkSchema, findLinkSchema, updateLinkSchema } from "./schema";

// Function to convert a number to base 62 string
function encodeBase62(number) {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const base = characters.length;
  let result = "";

  while (number > 0) {
    result = characters[number % base] + result;
    number = Math.floor(number / base);
  }

  return result;
}

const getAllLinks: ValidatedEventAPIGatewayProxyEvent<any> = async (
  event,
  context
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectMongo();

  const allLinks = await LinksModel.find();

  return formatJSONResponse({
    links: allLinks,
  });
};

const createLink: ValidatedEventAPIGatewayProxyEvent<
  typeof createLinkSchema
> = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectMongo();

  const timestamp = Date.now(); // Get the current timestamp
  const uniqueId = Math.floor(Math.random() * 1000000); // Generate a unique identifier

  const shortUrlCode = encodeBase62(timestamp + uniqueId); // Combine and encode the timestamp and unique identifier
  //const ip_address = event.requestContext.identity.sourceIp;

  const find_long_url = await LinksModel.findOne({
    long_url: event.body.long_url,
  });
  if (find_long_url) {
    console.log("Long URL:" + find_long_url);
    return formatJSONResponse({
      link: find_long_url.short_url,
    });
  } else {
    const newLink = new LinksModel({
      long_url: event.body.long_url,
      short_url: shortUrlCode,
      creation_date: Date.now(),
    //  ip_address : ip_address

    });

    await newLink.save();
    // alert("Short URL Generated");
    return formatJSONResponse({
      link: newLink,
    });
  }
};

const findLink: ValidatedEventAPIGatewayProxyEvent<
  typeof findLinkSchema
> = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectMongo();

  // const short_code = event.queryStringParameters?.short_code;
  const find_link = await LinksModel.findOne({
    short_url: event.body.short_url,
  });

  console.log(find_link);

  return formatJSONResponse({
    link: find_link,
  });
};

const searchLink: ValidatedEventAPIGatewayProxyEvent<
  typeof findLinkSchema
> = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectMongo();

  if (!event.body.long_url) {
    const allLinks = await LinksModel.find();
    return formatJSONResponse({
      links: allLinks,
    });
  } else {
    const find_link = await LinksModel.find({
      $or: [
        { short_url: { $regex: `.*${event.body.long_url}.*`, $options: "i" } },
        { long_url: { $regex: `.*${event.body.long_url}.*`, $options: "i" } },
      ],
    });

    console.log(find_link);

    return formatJSONResponse({
      links: find_link,
    });
  }
};

export const updateLink: ValidatedEventAPIGatewayProxyEvent<
  typeof updateLinkSchema
> = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectMongo();

  const { _id, short_url, new_short_url } = event.body;
    const existingLink = await LinksModel.findByIdAndUpdate({ _id , short_url});
    console.log("Before Updated Link: "+existingLink)
    if (!existingLink) {
      return formatErrorResponse(404, "Link not found");
    } else if (existingLink.short_url === new_short_url) {
      return formatErrorResponse(400,"New short URL must be different");
    } else {
      const newLink = await LinksModel.findOne({ short_url: new_short_url });
      if (newLink) {
        return formatErrorResponse(400, "New short URL already exists");
      }

      existingLink.short_url = new_short_url;
      await existingLink.save();
      console.log("Updated Link: "+existingLink)
    }
    return formatJSONResponse({
      message: "Link updated successfully",
      link: existingLink
    });
};

// export const CHECK_SHORT_URL = middyfy(checkShortUrl);
export const UPDATE_LINK = middyfy(updateLink);
export const SEARCH_LINK = middyfy(searchLink);
export const FIND_LINK = middyfy(findLink);
export const GET_ALL_LINKS = middyfy(getAllLinks);
export const CREATE_LINK = middyfy(createLink);

// function alert(arg0: string) {
//   throw new Error("Function not implemented.");
// }
