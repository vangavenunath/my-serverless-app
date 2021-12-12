import { Handler, APIGatewayEvent} from 'aws-lambda';
import { deleteConnection, insertConnection } from '../facades/dynamodb';

export const handler: Handler = async (event: APIGatewayEvent) => {
    const connectionId = event.requestContext.connectionId
    if(event.requestContext.eventType === 'CONNECT') {
        console.log('Adding connection to DynamoDB', connectionId)
        await insertConnection({connectionId, domain: event.requestContext.domainName, stage: event.requestContext.stage})
    } else {
        console.log('Removing connection from DynamoDB', connectionId)
        await deleteConnection({connectionId})
    }
    return { 
        statusCode: 200, 
        body: JSON.stringify({ msg: 'Connected'})
    };
};
