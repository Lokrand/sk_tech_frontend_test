import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "firebase.js";

class MainApi {
  static getMessagesList() {
    return new Promise((resolve, reject) => {
      const q = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      onSnapshot(
        q,
        (QuerySnapshot) => {
          const fetchedMessages: any[] = [];
          QuerySnapshot.forEach((doc) => {
            fetchedMessages.push({ ...doc.data(), id: doc.id });
          });
          const sortedMessages = fetchedMessages.sort(
            (a, b) => a.createdAt - b.createdAt
          );
          console.log("sortedMessages", sortedMessages);
          resolve(sortedMessages);
        },
        reject
      );
    });
  }
}

export default MainApi;
