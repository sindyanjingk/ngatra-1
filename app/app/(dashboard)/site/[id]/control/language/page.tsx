import LanguageForm from '@/components/language/language-form'
import { Input } from '../../../../../../../components/ui/input'
import React, { useState } from 'react'
import prisma from '@/lib/prisma';


const Language = async  ({
  params
} : {
  params: { id: string };
}) => {
  const siteLanguage = await prisma.siteLanguage.findFirst({
    where : {
      siteId : params.id
    },
    include : {
      siteLanding : true
    }
  }) ?? {
    siteLanding: null
  };
  
  return (
    <div className="text-xl">Language form</div>
  )
}
export default Language