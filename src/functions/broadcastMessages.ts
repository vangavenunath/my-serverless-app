import { Handler, SQSEvent } from "aws-lambda";
import util from "util";
import { sendMessageToClient } from "../facades/websocket";
import { getAllConnections } from "../facades/dynamodb";

export const handler: Handler = async (event: SQSEvent) => {
  console.log("SQS Event", event.Records);

  for(let record of event.Records) {
    // get active connections from dynamoDB
    const connections = await getAllConnections();

    // send message to all connections
    await Promise.allSettled(
      connections.map(({ connectionId, domainName, stage }) => {
        const callbackUrlForAWS = process.env.IS_OFFLINE
          ? "http://localhost:3001"
          : util.format(util.format("https://%s/%s", domainName, stage));
        return sendMessageToClient(
          callbackUrlForAWS,
          connectionId,
          JSON.stringify(record.body)
        );
      })
    );
  };
};
