import { queryUserDataByEmail } from "../facades/dynamodb";
import { Handler } from 'aws-lambda';
import { MessageUtil } from "../utils/message";

export const handler: Handler = async (event: any) => {
    console.log(event)
    try { 
      const queryParams = event.pathParameters;
      const result = await queryUserDataByEmail(queryParams.email);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
};