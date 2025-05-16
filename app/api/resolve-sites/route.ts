import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { hostname, path } = req.query;

  if (!hostname || Array.isArray(hostname)) {
    return res.status(400).json({ error: "Invalid hostname" });
  }

  const site = await prisma.sites.findFirst({
    where: {
      OR: [
        { subdomain: hostname.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "") },
        { customDomain: hostname },
      ],
    },
  });

  console.log({site});
  

  if (!site) {
    return res.redirect("/404");
  }

  const sitePath = site.subdomain ? site.subdomain : site.customDomain;
  return res.redirect(`/${sitePath}${path || ""}`);
}
