import { betterAuth, type BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@project/db";
import * as schema from "@project/db/schema/auth";
import { env } from "cloudflare:workers";

export const auth = betterAuth<BetterAuthOptions>({
    database: drizzleAdapter(db, {
        provider: "pg",

        schema: schema,
    }),
    trustedOrigins: [env.CORS_ORIGIN],
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    // uncomment cookieCache setting when ready to deploy to Cloudflare using *.workers.dev domains
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60,
        },
    },
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    advanced: {
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
            httpOnly: true,
        },
        // uncomment crossSubDomainCookies setting when ready to deploy and replace <your-workers-subdomain> with your actual workers subdomain
        // https://developers.cloudflare.com/workers/wrangler/configuration/#workersdev
        // crossSubDomainCookies: {
        //   enabled: true,
        //   domain: "<your-workers-subdomain>",
        // },
    },
});
