import { headers } from "next/headers";
import { auth } from "../auth";


export const GetUserInserver = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const User = session?.user;
    return User
}