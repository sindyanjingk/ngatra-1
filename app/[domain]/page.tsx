import BenefitSection from '@/components/site/benefit-section';
import FeatureSection from '@/components/site/feature-section';
import Footer from '@/components/site/footer';
import HeroSection from '@/components/site/hero-section';
import SiteNavbar from '@/components/site/navbar';
import ServiceSection from '@/components/site/service-section';
import prisma from '../../lib/prisma';
import React from 'react'
import QuestionSection from '@/components/site/question-section';
import CallToAction from '@/components/site/call-to-action';
import FloatingWAButton from '@/components/integrations/floating-wa-button';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';


const DomainPage = async ({
  params,
}: {
  params: { domain: string; slug: string };
}) => {
  const domain = decodeURIComponent(params.domain);
  const site = await prisma.sites.findFirst({
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

  if(!site) {
    return <div>Site not found</div>
  }
  const siteSettings = await prisma.siteSettings.findFirst({
    where: {
      siteId: site?.id
    }
  })

  const siteDesigns = await prisma.siteDesigns.findFirst({
    where: {
      siteId: site?.id
    }
  })

  const siteLanguage = await prisma.siteLanguage.findFirst({
    where: {
      siteId: site?.id
    },
    include: {
      siteLanding: true
    }
  })

  const session = await getSession()
  if(session){
    redirect('dashboard')
  }

  return (
    <div style={{
      color: siteDesigns?.textColor || "#1f2937",
      backgroundColor: siteDesigns?.backgroundColor || "#f3f4f6",
    }} className='text-gray-800'>
      <SiteNavbar
        signIn={siteLanguage?.siteLanding?.signIn!}
        signUp={siteLanguage?.siteLanding?.signUp!}
        newOrder={siteLanguage?.siteLanding?.newOrder!}
        services={siteLanguage?.siteLanding?.service!}
        logo={siteDesigns?.logo!} />
      <HeroSection
        startNow={siteLanguage?.siteLanding?.startNow || ""}
        fastOrder={siteLanguage?.siteLanding?.fastOrder || ""}
        most={siteLanguage?.siteLanding?.mostConvenient || ""}
        become={siteLanguage?.siteLanding?.become || ""}
        buttonColor={siteDesigns?.buttonColor!} />
      <FeatureSection
        huge={siteLanguage?.siteLanding?.hugeAssortment || ""}
        hugeDesc={siteLanguage?.siteLanding?.hugeDesc || ""}
        autoMatic={siteLanguage?.siteLanding?.fullAutomatic || ""}
        autoMaticDesc={siteLanguage?.siteLanding?.automaticDesc || ""}
        support={siteLanguage?.siteLanding?.greatSupport || ""}
        supportDesc={siteLanguage?.siteLanding?.supportDesc || ""}
      />
      <ServiceSection
        ourPanel={siteLanguage?.siteLanding?.ourPanelIsGood || ""}
        likeFollowers={siteLanguage?.siteLanding?.likesFollowers || ""}
      />
      <BenefitSection
        startNow={siteLanguage?.siteLanding?.startNow || ""}
        attractive={siteLanguage?.siteLanding?.attractive || ""}
        advantages={siteLanguage?.siteLanding?.advantages || ""}
        buttonColor={siteDesigns?.buttonColor!} />
      <QuestionSection
        areFollowers={siteLanguage?.siteLanding?.areFollowersReal || ""}
        areFollowersDesc={siteLanguage?.siteLanding?.areFollowersDesc || ""}
        guarantees={siteLanguage?.siteLanding?.guarantees || ""}
        guaranteesDesc={siteLanguage?.siteLanding?.guaranteesDesc || ""}
        isSecure={siteLanguage?.siteLanding?.isSecure || ""}
        isSecureDesc={siteLanguage?.siteLanding?.isSecureDesc || ""}
        howToTrack={siteLanguage?.siteLanding?.howToTrack || ""}
        howToTrackDesc={siteLanguage?.siteLanding?.howToTrackDesc || ""}
      />
      <CallToAction
        buttonColor={siteDesigns?.buttonColor!}
        startNow={siteLanguage?.siteLanding?.startNow || "Start Now"}
        cta={siteLanguage?.siteLanding?.callToAction || ""} />
      <FloatingWAButton phone='6281234567890' />
      <Footer showBanner={siteSettings?.showBanner!} />

    </div>
  )
}

export default DomainPage