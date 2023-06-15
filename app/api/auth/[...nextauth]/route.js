import NextAuth from "next-auth/next";
import GoogleProviders from "next-auth/providers/google";
import { connectToDatabase } from "@utils/database";

import { User } from "@models/user";

// console.log({
//   clientId: process.env.GOOGLE_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// });



const handler = NextAuth({
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      // * We look for the user in the database
      const userSession = await User.findOne({ email: session.user.email });

      // * We add the user id to the session object
      session.user.id = userSession._id.toString();

      return session; // * return the session object
    },

    async signIn({ profile }) {
      try {
        // * We are connecting to the database
        await connectToDatabase();

        // * check if a user already exists
        const userExists = await User.findOne({ email: profile.email });

        // * if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        };

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  }
});

export { handler as GET, handler as POST };
