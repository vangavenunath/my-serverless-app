export interface RegisterUserInput {
    username: string,
    email: string
}

export interface UpdateUserInput extends RegisterUserInput {
    userId: string
}

export interface BoardInput {
    boardname: string
}

export interface ConnectionInput {
    connectionId: string,
    domain?: string,
    stage?: string
}

export interface MessageDetails {
    messageId: string,
    boardname: string,
    message: string
}