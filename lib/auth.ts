import { getServerSession, type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import { headers } from "next/headers";
import { getSiteContext } from "./getSiteContext";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;
export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const {
          host,
          isRootDomain,
        } = getSiteContext();
        console.log({ host, isRootDomain });
        if (!isRootDomain) {
          console.log("trigerred");
          const site = await prisma.sites.findFirst({
            where: {
              OR: [
                {
                  subdomain: host.split(".")[0],
                },
                {
                  customDomain: host.split(":")[0],
                }
              ]
            },
          });
          if (!site) {
            throw new Error("Site not found");
          }
          const userSite = await prisma.userSite.findFirst({
            where: {
              siteId: site?.id,
              user: {
                email: credentials.email
              }
            }
          })
          if (!userSite) {
            throw new Error("User not found");
          }
          return userSite
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User not found");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: "/login",
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: VERCEL_DEPLOYMENT,
      },
    },
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    },
    state: {
      name: 'next-auth.state',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
        token.sub = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        // @ts-ignore
        id: token.sub,
        // @ts-ignore
        username: token?.user?.username || token?.user?.gh_username,
      };
      return session;
    },
  },
};

export function getSession() {
  return getServerSession(authOptions) as Promise<{
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      image: string;
    };
  } | null>;
}

export function withSiteAuth(action: any) {
  return async (
    formData: FormData | null,
    siteId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session) {
      return {
        error: "Not authenticated",
      };
    }

    const site = await prisma.sites.findFirst({
      where: {
        id: siteId
      }
    });

    if (!site || site.userId !== session.user.id) {
      return {
        error: "Not authorized",
      };
    }

    return action(formData, site, key);
  };
}

export function withPostAuth(action: any) {
  return async (
    formData: FormData | null,
    postId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }

    const post = await prisma.posts.findFirst({
      where: {
        id: postId
      },
      include: {
        sites: true
      }
    });

    if (!post || post.userId !== session.user.id) {
      return {
        error: "Post not found",
      };
    }

    return action(formData, post, key);
  };
}
