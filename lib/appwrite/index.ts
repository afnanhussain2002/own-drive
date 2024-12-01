import { Client } from "node-appwrite";
import { appwriteConfig } from "./config";
import { cookies } from "next/headers";

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);
    const session = (await cookies()).get('appwrite-session');

    if (!session || !session.value) throw new Error('No session found');
    client.setSession(session.value);

export const createAdminClient = async() =>{

}