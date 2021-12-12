import { insertUserData } from "../facades/dynamodb";
import { Handler } from "aws-lambda";
import { MessageUtil } from "../utils/message";
import { publishToSNS } from "../facades/sns";

export const handler: Handler = async (event: any) => {
  console.log(event);
  try {
    const userDetails = JSON.parse(event.body);

    await insertUserData(userDetails);

    await publishToSNS("users", event.body)
      .then((v) => console.log("Published to SNS", v))
      .catch((err) => console.log(err));

    return MessageUtil.success({});
  } catch (err) {
    console.error(err);

    return MessageUtil.error(err.code, err.message);
  }
};
