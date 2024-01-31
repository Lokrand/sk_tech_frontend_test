import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "firebase.js";
import { eventChannel } from "redux-saga";
import { Message } from "types";

class MainApi {
  static getMessagesList() {
    return eventChannel((emit) => {
      const q = query(
        collection(db, "messages"),
        orderBy("createdAt", "asc"),
        limit(50)
      );
      const fetchedMessages: Message[] = [];
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            fetchedMessages.push({
              ...(change.doc.data() as Message),
              id: change.doc.id,
            });
          }
        });
        emit([...fetchedMessages]);
      });
      return unsubscribe;
    });
  }
}

export default MainApi;
