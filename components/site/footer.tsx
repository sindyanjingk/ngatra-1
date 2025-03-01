import Image from 'next/image'
import React from 'react'

type Props = {
  showBanner?: boolean
}

const Footer = ({ showBanner }: Props) => {
  return (
    <div className='border-t-2 border-gray-700 py-12 px-8 mt-20 flex items-center justify-between md:p-8'>
      <Image src={"/logo.png"} alt="logo" width={100} height={100} />
      {
        showBanner &&
        <div className="p-4 shadow-sm font-semibold border rounded-md flex items-center gap-x-2">
          <Image src={"/ngatra-logo.svg"} alt='ngatra -loho' height={32} width={32} />
          Made by Ngatra
        </div>
      }
    </div>
  )
}

export default Footer