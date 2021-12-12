#!/usr/bin/env bash
sleep 5

# DynamoDB
AWS_SECRET_ACCESS_KEY=NONE AWS_ACCESS_KEY_ID=NONE AWS_DEFAULT_REGION=ap-southeast-2 aws --endpoint-url=http://localstack:4566 dynamodb create-table \
    --table-name users_nonprod \
    --attribute-definitions AttributeName=EMAIL,AttributeType=S \
    --key-schema AttributeName=EMAIL,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST
AWS_SECRET_ACCESS_KEY=NONE AWS_ACCESS_KEY_ID=NONE AWS_DEFAULT_REGION=ap-southeast-2 aws --endpoint-url=http://localstack:4566 dynamodb create-table \
    --table-name messages_nonprod \
    --attribute-definitions AttributeName=MESSAGE,AttributeType=S \
    --key-schema AttributeName=MESSAGE,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST
AWS_SECRET_ACCESS_KEY=NONE AWS_ACCESS_KEY_ID=NONE AWS_DEFAULT_REGION=ap-southeast-2 aws --endpoint-url=http://localstack:4566 dynamodb create-table \
    --table-name boards_nonprod \
    --attribute-definitions AttributeName=BOARD_NAME,AttributeType=S \
    --key-schema AttributeName=BOARD_NAME,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST
AWS_SECRET_ACCESS_KEY=NONE AWS_ACCESS_KEY_ID=NONE AWS_DEFAULT_REGION=ap-southeast-2 aws --endpoint-url=http://localstack:4566 dynamodb create-table \
    --table-name connections_nonprod \
    --attribute-definitions AttributeName=CONNECTION_ID,AttributeType=S \
    --key-schema AttributeName=CONNECTION_ID,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST
# SNS
AWS_SECRET_ACCESS_KEY=NONE AWS_ACCESS_KEY_ID=NONE AWS_DEFAULT_REGION=ap-southeast-2 aws --endpoint-url=http://localstack:4566 sns create-topic \
    --name REGISTERED_USERS_nonprod

# SQS
AWS_SECRET_ACCESS_KEY=NONE AWS_ACCESS_KEY_ID=NONE AWS_DEFAULT_REGION=ap-southeast-2 aws --endpoint-url=http://localstack:4566 sqs create-queue \
    --queue-name MESSAGES_nonprod