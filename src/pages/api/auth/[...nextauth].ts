import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

import { query as q } from 'faunadb'

import { fauna } from "../../../services/fauna";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "read:user"
                }
            }
        }),       

        // ...add more providers here
    ],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const { email: emailAdress  } = user;

            await fauna.query(
                q.Create(
                    q.Collection('users'),
                    { data: { email: emailAdress } }
                )
            );

            return true;
        },
    }
    
});