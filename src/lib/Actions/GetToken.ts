'use server'

import { headers } from "next/headers"
import { auth } from "../auth"
import { GetUserInserver } from "./Getuser";



export interface AuthHeaderResult {
    Authorization?: string;
    User?: string;
}


export const GetJwtToken = async (): Promise<string | undefined> => {

    const session = await auth.api.getToken({
        headers: await headers()
    });


    const token = session?.token;

    return token;
}


export const authHeader = async (): Promise<AuthHeaderResult> => {
    const user = await GetUserInserver();
    const userId = user?.id;
    const token = await GetJwtToken();


    return token && userId
        ? {
            Authorization: `Bearer ${token}`,
            User: userId,
        }
        : {};
};

