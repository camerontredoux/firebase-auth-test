import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db, UserType } from "./auth";

export const createUser = async (uid: string, data: UserType) => {
  return await setDoc(
    doc(db, "users", uid),
    {
      ...data,
      time: Timestamp.now(),
    },
    { merge: true }
  );
};
