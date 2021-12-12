import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand
} from "@aws-sdk/client-apigatewaymanagementapi";

export const sendMessageToClient = async (url: string, connectionId: string, payload: string) => {
    const config = {
        region: "ap-southeast-2",
        endpoint: url
    }
    const client = new ApiGatewayManagementApiClient(config)
    var enc = new TextEncoder();
    const input = {
      ConnectionId: connectionId,
      Data: enc.encode(payload),
    };
    const command = new PostToConnectionCommand(input);
    console.log('Sending message to client', connectionId)
    const response = await client.send(command);
    // TODO: Remove connectionIds for failed messages from DynamoDB
    console.log(response);
  }
