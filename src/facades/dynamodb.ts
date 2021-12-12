import {
  DeleteItemCommand,
  DynamoDBClient,
  DynamoDBClientConfig,
  PutItemCommand,
  PutItemCommandInput,
  QueryCommand,
  QueryCommandInput,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import {
  BoardInput,
  ConnectionInput,
  MessageDetails,
  RegisterUserInput,
  UpdateUserInput,
} from "../types";

let options: DynamoDBClientConfig = {
  region: "ap-southeast-2",
};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
  options = {
    ...options,
    endpoint: "http://localhost:8000",
  };
}

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient(options);

export const insertUserData = async (userDetails: RegisterUserInput) => {
  const data = {
    USER_ID: { S: "NOT AVAILABLE" },
    USERNAME: { S: userDetails.username },
    EMAIL: { S: userDetails.email },
  };
  const params: PutItemCommandInput = {
    TableName: `users_${process.env.STAGE}`,
    Item: data,
  };
  try {
    const data = await ddbClient.send(new PutItemCommand(params));
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateUserData = async (data: UpdateUserInput): Promise<void> => {
  try {
    const input: UpdateItemCommandInput = {
      TableName: `users_${process.env.STAGE}`,
      Key: {
        EMAIL: { S: data.email },
      },
      UpdateExpression: "SET USER_ID = :userid",
      ExpressionAttributeValues: {
        ":userid": { S: data.userId },
      },
      ReturnValues: "UPDATED_NEW",
    };

    const result = await ddbClient.send(new UpdateItemCommand(input));
    console.log("UserId update successful:" + result);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const queryUserDataByEmail = async (email: string) => {
  try {
    const params: QueryCommandInput = {
      KeyConditionExpression: "EMAIL = :email",
      ExpressionAttributeValues: {
        ":email": { S: email },
      },
      ProjectionExpression: "EMAIL, USERNAME, USER_ID",
      TableName: `users_${process.env.STAGE}`,
    };
    const data = await ddbClient.send(new QueryCommand(params));
    return data.Items
      ? data.Items.map((v) => {
          return {
            email: v.EMAIL.S,
            username: v.USERNAME.S,
            userId: v.USER_ID.S,
          };
        })
      : [];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const insertBoardData = async (data: BoardInput): Promise<void> => {
  try {
    const params: PutItemCommandInput = {
      TableName: `boards_${process.env.STAGE}`,
      Item: { BOARD_NAME: { S: data.boardname } },
    };
    await ddbClient.send(new PutItemCommand(params));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const insertMessageData = async (
  messageDetails: MessageDetails
) => {
  const data = {
    ID: { S: messageDetails.messageId },
    BOARD_NAME: { S: messageDetails.boardname },
    MESSAGE: { S: messageDetails.message },
  };
  const params: PutItemCommandInput = {
    TableName: `messages_${process.env.STAGE}`,
    Item: data,
  };
  try {
    const data = await ddbClient.send(new PutItemCommand(params));
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getMessageBoards = async () => {
  try {
    const params: ScanCommandInput = {
      ProjectionExpression: "BOARD_NAME",
      TableName: `boards_${process.env.STAGE}`,
    };
    const data: ScanCommandOutput = await ddbClient.send(
      new ScanCommand(params)
    );
    return data.Items ? data.Items.map((v) => v.BOARD_NAME.S) : [];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllConnections = async () => {
  try {
    const params: ScanCommandInput = {
      ProjectionExpression: "CONNECTION_ID, DOMAIN, STAGE",
      TableName: `connections_${process.env.STAGE}`,
    };
    const data: ScanCommandOutput = await ddbClient.send(
      new ScanCommand(params)
    );
    return data.Items
      ? data.Items.map((v) => {
          return {
            connectionId: v.CONNECTION_ID.S,
            domain: v.DOMAIN.S,
            stage: v.STAGE.S,
          };
        })
      : [];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const insertConnection = async (data: ConnectionInput) => {
  try {
    const params: PutItemCommandInput = {
      TableName: `connections_${process.env.STAGE}`,
      Item: {
        CONNECTION_ID: { S: data.connectionId },
        DOMAIN: { S: data.domain },
        STAGE: { S: data.stage },
      },
    };
    await ddbClient.send(new PutItemCommand(params));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteConnection = async (data: ConnectionInput) => {
  try {
    const input = {
      TableName: `connections_${process.env.STAGE}`,
      Key: {
        CONNECTION_ID: { S: data.connectionId },
      },
    };
    await ddbClient.send(new DeleteItemCommand(input));
  } catch (err) {
    console.error(err);
    throw err;
  }
};
