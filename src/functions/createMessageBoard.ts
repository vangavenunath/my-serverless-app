import { insertBoardData } from "../facades/dynamodb";
import { Handler } from 'aws-lambda';
import { MessageUtil } from "../utils/message";

export const handler: Handler = async (event: any) => {
    console.log(event)
    try {  
      const boardDetails = JSON.parse(event.body);     
      await insertBoardData(boardDetails);
      return MessageUtil.success({});
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
};