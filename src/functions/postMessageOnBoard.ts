import { insertMessageData } from "../facades/dynamodb";
import { Handler } from "aws-lambda";
import { MessageUtil } from "../utils/message";
import { randomUUID } from "crypto";
import { publishToSQS } from "../facades/sqs";

export const handler: Handler = async (event: any) => {
  console.log(event);
  try {
    const messageDetails = JSON.parse(event.body);
    // TODO: check existence of message board.
    await insertMessageData({
      ...messageDetails,
      messageId: randomUUID({ disableEntropyCache: true }),
    });
    await publishToSQS(event.body)
      .then((v) => console.log("Published to SQS", v))
      .catch((err) => console.log(err));
    return MessageUtil.success({});
  } catch (err) {
    console.error(err);

    return MessageUtil.error(err.code, err.message);
  }
};
