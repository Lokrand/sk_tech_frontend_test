export type Message = {
    id: string,
    createdAt: string,
    owner: string,
    text: string
};

export type MessagesList = Array<Message>;