import { getMessageBoards } from "../facades/dynamodb";
import { Handler } from 'aws-lambda';
import { MessageUtil } from "../utils/message";

export const handler: Handler = async (event: any) => {
    console.log(event)
    try {        
      const result = await getMessageBoards();
      return MessageUtil.success(Array.from(new Set(result)));
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
};