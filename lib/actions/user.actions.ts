"use server";

import { createAdminClient } from "../appwrite";

const getUserByEmail = async (email: string) => {
   const {database} = await createAdminClient();
   
}

const createAccount = async ({fullName,email}: {fullName: string, email: string}) => {

};