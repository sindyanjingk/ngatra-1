import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'


const SupportPage = () => {
  return (
    <div className="spce-y-4 flex flex-col items-center justify-center">
      <a
        className='w-full flex items-center justify-center cursor-pointer'
        href={"https://wa.me/6281315805251"}
        target="_blank"
        rel="noopener noreferrer">
        <div className="p-4 border rounded-xl flex items-center justify-between  md:w-2/4 cursor-pointer">
          <div className="flex items-center gap-x-4">
            <Image src={"/wa-button.png"} alt='wa' width={40} height={40} />
            <div className="text-xl font-bold">Chat Us</div>
          </div>
          <div className="text-xl font-bold"><ChevronRight /></div>
        </div>
      </a>
    </div>
  )
}

export default SupportPage