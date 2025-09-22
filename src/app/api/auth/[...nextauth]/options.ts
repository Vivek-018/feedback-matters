// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/model/User";

// type Credentials = {
//   identifier: string;
//   password: string;
// };


// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials: Record<string, string> | undefined): Promise<any> {
//         // if (!credentials) return null;

//         // await dbConnect();
//         // try {
//         //   const user = await UserModel.findOne({
//         //     $or: [
//         //       { email: credentials.identifier },
//         //       { username: credentials.identifier },
//         //     ],
//         //   });

//         //   if (!user) {
//         //     throw new Error("No user found with this email");
//         //   }

//         //   if (!user.isVerified) {
//         //     throw new Error("Please verify your account before login");
//         //   }

//         //   const isPasswordCorrect = await bcrypt.compare(
//         //     credentials.password,
//         //     user.password
//         //   );

//         //   if (isPasswordCorrect) {
//         //     return user;
//         //   } else {
//         //     throw new Error("Incorrect password");
//         //   }
//         // } catch (error) {
//         //    if (error instanceof Error) {
//         //     throw new Error(error.message);
//         //   }
//         //   throw new Error("Internal server error");
//         // }
//         if (!credentials) return null;

//         await dbConnect();
//         try {
//           const { identifier, password } = credentials as Credentials;

//           const user = await UserModel.findOne({
//             $or: [{ email: identifier }, { username: identifier }],
//           });

//           if (!user) {
//             throw new Error("No user found with this email");
//           }

//           if (!user.isVerified) {
//             throw new Error("Please verify your account before login");
//           }

//           const isPasswordCorrect = await bcrypt.compare(password, user.password);

//           if (isPasswordCorrect) {
//             return user;
//           } else {
//             throw new Error("Incorrect password");
//           }
//         } catch (error) {
//           if (error instanceof Error) {
//             throw new Error(error.message);
//           }
//           throw new Error("Internal server error");
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token._id = user._id?.toString();
//         token.isVerified = user.isVerified;
//         token.isAcceptingmessages = user.isAcceptingMessages;
//         token.username = user.username;
//       }

//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user._id = token._id;
//         session.user.isVerified = token.isVerified;
//         session.user.isAcceptingMessages = token.isAcceptingMessages;
//         session.user.username = token.username;
//       }

//       return session;
//     },
//   },
//   pages: {
//     signIn: "/sign-in",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };


import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

type Credentials = {
  identifier: string;
  password: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<string, string> | undefined
      ): Promise<import("next-auth").User | null> {
        if (!credentials) return null;

        await dbConnect();
        const { identifier, password } = credentials as Credentials;

        const user = await UserModel.findOne({
          $or: [{ email: identifier }, { username: identifier }],
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        if (!user.isVerified) {
          throw new Error("Please verify your account before login");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Incorrect password");
        }

        // 👇 Return a valid NextAuth "User"
        return {
          id: user._id.toString(), // ✅ fixes "unknown" issue
          email: user.email,
          username: user.username,
          isVerified: user.isVerified,
          isAcceptingMessages: user.isAcceptingMessage, // map correctly
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = (user as any).id;
        token.isVerified = (user as any).isVerified;
        token.isAcceptingMessages = (user as any).isAcceptingMessages;
        token.username = (user as any).username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.isAcceptingMessages =
          token.isAcceptingMessages as boolean;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
