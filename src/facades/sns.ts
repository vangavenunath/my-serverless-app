import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";

let config = {
  region: "ap-southeast-2",
};

let client = new SNSClient(config);

if (process.env.IS_OFFLINE) {
  const localConfig = {
    ...config,
    endpoint: "http://localhost:8000",
  };
  client = new SNSClient(localConfig);
  process.env.SNS_ARN = 'arn:aws:sns:ap-southeast-2:000000000000:REGISTERED_USERS_nonprod';
}

export const publishToSNS = async (Subject: string, Message: string) => {
  const input = {
    Message,
    Subject,
    TopicArn: process.env.SNS_ARN,
  };
  const command = new PublishCommand(input);
  await client.send(command);
};
