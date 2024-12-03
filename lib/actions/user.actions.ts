"use server";

import { Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";

const getUserByEmail = async (email: string) => {
   const {database} = await createAdminClient();

   const result = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])]

   )
   return result.total > 0 ? result.documents[0] : null;
}

const createAccount = async ({fullName,email}: {fullName: string, email: string}) => {
 const existingUser = await getUserByEmail(email);
};