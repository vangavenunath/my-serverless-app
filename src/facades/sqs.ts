import {
  SQSClient,
  SendMessageCommand,
  SendMessageCommandInput,
} from "@aws-sdk/client-sqs"; // ES Modules import

let config = {
  region: "ap-southeast-2",
};

let client: SQSClient;

if (process.env.IS_OFFLINE) {
  const localConfig = {
    ...config,
    endpoint: "http://localhost:8000",
  };
  client = new SQSClient(localConfig);
  process.env.SQS_URL = "http://localhost:4566/000000000000/MESSAGES_nonprod";
} else {
  client = new SQSClient(config);
}

export const publishToSQS = async (Message: string) => {
  const input: SendMessageCommandInput = {
    QueueUrl: process.env.SQS_URL,
    MessageBody: Message,
  };
  const command = new SendMessageCommand(input);
  await client.send(command);
};
