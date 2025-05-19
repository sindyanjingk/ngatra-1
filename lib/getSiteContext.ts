import { headers } from 'next/headers';

export function getSiteContext() {
  const host = headers().get("host") || "";
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "yourdomain.com";

  // root domain = yourdomain.com, www.yourdomain.com
  const isRootDomain = host === rootDomain || host === `www.${rootDomain}`;

  return {
    host,
    isRootDomain,
  };
}
