import { Handler, SQSEvent } from "aws-lambda";
import util from "util";
import { sendMessageToClient } from "../facades/websocket";
import { getAllConnections } from "../facades/dynamodb";

export const handler: Handler = async (event: SQSEvent) => {
  console.log("SQS Event", event.Records);

  event.Records.forEach(async (record) => {
    // get active connections from dynamoDB
    const connections = await getAllConnections();

    // send message to all connections
    await Promise.allSettled(
      connections.map(({ connectionId, domain, stage }) => {
        const callbackUrlForAWS = process.env.IS_OFFLINE
          ? "http://localhost:3001"
          : util.format(util.format("https://%s/%s", domain, stage));
        return sendMessageToClient(
          callbackUrlForAWS,
          connectionId,
          JSON.stringify(record.body)
        );
      })
    );
  });
};
