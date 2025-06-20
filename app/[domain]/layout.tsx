
import { ReactNode } from "react";
import { Metadata } from "next";
import prisma from "../../lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";

export async function generateMetadata({
    params,
}: {
    params: { domain: string };
}): Promise<Metadata | null> {
    const domain = decodeURIComponent(params.domain);
    const data = await prisma.sites.findFirst({
        where: {
            OR: [
                {
                    customDomain: domain.split(":")[0],
                },
                {
                    subdomain: domain.split(".")[0],
                }
            ]
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
    const domain = decodeURIComponent(params.domain);
    console.log({ domain });

    const data = await prisma.sites.findFirst({
        where: {
            OR: [
                {
                    customDomain: domain.split(":")[0],
                },
                {
                    subdomain: domain.split(".")[0],
                }
            ]
        },
    });
    if (!data) {
        return (
            <div className="text-xl font-bold min-h-screen w-screen bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center">
                <div className="space-y-8">
                    Your domain is not regisered yet
                    <div className="text-sm">Pelase register first</div>
                    <Link className="mt-8" href={`https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/register`}>
                        <Button>Register</Button>
                    </Link>
                </div>
            </div>
        )
    }

    const siteDesigns = await prisma.siteDesigns.findFirst({
        where: {
            siteId: data?.id,
        }
    })

    const siteIntegrations = await prisma.siteIntegrations.findFirst({
        where: {
            siteId: data?.id,
        }
    })

    return (
        <div style={{
            backgroundColor: siteDesigns?.backgroundColor || "",
            color: siteDesigns?.textColor || "",
        }} className={`min-h-screen`}>
            {
                siteIntegrations?.googleAnalytics &&
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${siteIntegrations?.googleAnalytics}`}
                        strategy="afterInteractive" />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteIntegrations?.googleAnalytics}');
          `}
                    </Script>
                </>
            }
            <main className="">
                {children}
            </main>
        </div>
    );
}
