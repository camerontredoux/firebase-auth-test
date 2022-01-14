import { doc, setDoc, Timestamp } from "firebase/firestore";
import { UserType } from "./auth";
import { db } from "./auth";

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
