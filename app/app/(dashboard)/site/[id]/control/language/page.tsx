
import LanguageForm from '@/components/language/language-form'
import prisma from '@/lib/prisma'
import React from 'react'

const LanguagePage = async ({
  params
}: {
  params: { id: string }
}) => {
  const siteLanguage = await prisma.siteLanguage.findFirst({
    where: {
      siteId: params.id
    },
    include: {
      siteLanding: true
    }
  })

  return (
    <div className="p-6">
      <LanguageForm siteLanguage={siteLanguage} />
    </div>
  )
}

export default LanguagePage
