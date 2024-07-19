import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import sendVerificationRequest from "@/app/helpers/sendVerificationMail";

const authOptions = {
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASS,
                },
            },
            from: process.env.EMAIL_FROM,
            sendVerificationRequest({ identifier, url }){
                sendVerificationRequest({ identifier, url });
            }
        })
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };