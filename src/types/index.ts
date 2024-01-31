import { Timestamp } from "firebase/firestore";

export type Message = {
  id: string;
  createdAt: Timestamp;
  owner: string;
  text: string;
};

export type MessagesList = Array<Message>;
