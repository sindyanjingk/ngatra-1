import BenefitSection from '@/components/site/benefit-section';
import FeatureSection from '@/components/site/feature-section';
import Footer from '@/components/site/footer';
import HeroSection from '@/components/site/hero-section';
import SiteNavbar from '@/components/site/navbar';
import ServiceSection from '@/components/site/service-section';
import prisma from '../../lib/prisma';
import React from 'react'


const DomainPage = async  ({
    params,
}: {
  params: { domain: string; slug: string };
}) => {
    const domain = params.domain.split('.')[0];
    const site = await prisma.sites.findFirst({
        where: {
            subdomain: domain
        }
    })
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
  return (
    <div style={{
      color : siteDesigns?.textColor || "#1f2937",
      backgroundColor : siteDesigns?.backgroundColor || "#f3f4f6",
    }} className='text-gray-800'>
      <SiteNavbar logo={siteDesigns?.logo!}/>
      <HeroSection buttonColor={siteDesigns?.buttonColor!}/>
      <FeatureSection />
      <ServiceSection/>
      <BenefitSection buttonColor={siteDesigns?.buttonColor!}/>
      <Footer showBanner={siteSettings?.showBanner!}/>
    </div>
  )
}

export default DomainPage