import { updateUserData } from "../facades/dynamodb";
import { Handler } from 'aws-lambda';
import { randomUUID } from 'crypto'

export const handler: Handler = async (event: any) => {
    console.log('SNS Event',event)
    try {        
      const { Message } = event.Records[0].Sns
      const data = { userId: randomUUID({disableEntropyCache: true}), ...JSON.parse(Message)}      
      await updateUserData(data);
    } catch (err) {
      console.error(err);

    }
};