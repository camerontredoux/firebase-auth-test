import { collection, addDoc } from "firebase/firestore";
import { db } from "./auth";

export const createPost = async (values: any) => {
  return await addDoc(collection(db, "posts"), values);
};
