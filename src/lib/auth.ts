import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_URL as string);

await client.connect();

const db = client.db("DriveMaxDB");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },

    emailAndPassword: {
        enabled: true,
    },
    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 7 * 24 * 60 * 60
        }
    },
    plugins: [
        jwt()
    ],

    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "User",
            },
            updatedAt: {
                type: "date",
                defaultValue: new Date(),
            },
        },
    },
});