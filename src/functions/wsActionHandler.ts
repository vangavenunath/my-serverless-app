import { Handler } from "aws-lambda";

export const handler: Handler = async (event: any) => {
  console.log("Received Action event sendMessage", event);
};
