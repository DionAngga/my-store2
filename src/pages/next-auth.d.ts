import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            fullname?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string | null;
        };
    }
}