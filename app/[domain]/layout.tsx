
import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import prisma from "../../lib/prisma";

export async function generateMetadata({
    params,
}: {
    params: { domain: string };
}): Promise<Metadata | null> {
    const domain = decodeURIComponent(params.domain);
    const data = await prisma.sites.findFirst({
        where: {
            subdomain: domain.split(".")[0],
        },
    });

    if (!data) {
        return null;
    }
    const siteSettings = await prisma.siteSettings.findFirst({
        where: {
            siteId: data.id,
        },
    });
    const siteDesigns = await prisma.siteDesigns.findFirst({
        where: {
            siteId: data.id,
        }
    })
    const { name: title, description, image, logo } = data;
    return {
        title: siteSettings?.pageTitle || "Ngatra Panel",
        description: siteSettings?.pageDescription || "Ngatra Panel",
        openGraph: {
            title: title as string,
            description: description as string,
            images: [image as string],
        },
        keywords: siteSettings?.pageKeywords || "Ngatra Panel",
        icons: [siteDesigns?.logo as string],
        metadataBase: new URL(`https://${domain}`),
    };
}

export default async function SiteLayout({
    params,
    children,
}: {
    params: { domain: string };
    children: ReactNode;
}) {
    // const domain = decodeURIComponent(params.domain);
    // if (!domain) {
    //     notFound();
    // }
    // const data = await prisma.sites.findFirst({
    //     where: {
    //         subdomain: domain.split(".")[0],
    //     },
    // });

    // const siteDesigns = await prisma.siteDesigns.findFirst({
    //     where: {
    //         siteId: data?.id,
    //     }
    // })

    // if (!data) {
    //     notFound();
    // }

    // // Redirect to custom domain if it exists
    // if (
    //     domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    //     data.customDomain &&
    //     process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === "true"
    // ) {
    //     return redirect(`https://${data.customDomain}`);
    // }
    
    return (
        <div style={{
            // backgroundColor: siteDesigns?.backgroundColor || "",
            // color: siteDesigns?.textColor || "",
        }} className={`min-h-screen`}>
            <main className="">
                {children}
            </main>
        </div>
    );
}
