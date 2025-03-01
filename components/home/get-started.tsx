import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

type Props = {}

const GetStarted = (props: Props) => {
    return (
        <div className='space-y-3 flex flex-col items-center justify-center relative w-full'>
            <Image src={"/big-logo.png"} alt='get-started' width={312} height={254} className='rounded-3xl ' />
            <div className="space-y-3 flex flex-col items-center justify-center absolute top-10">
                <div className="text-6xl text-gray-900 text-center font-bold">
                    Create your own
                </div>
                <div className="text-6xl text-gray-900 text-center font-bold">
                    digital panel for your
                </div>
                <div className="text-6xl text-gray-900 text-center font-bold">
                    business
                </div>
                <div className="text-lg text-[#FF6A00]">The best platform for creating automated digital panels</div>
                <div className="flex items-center gap-x-4">
                    <Button className='rounded-full bg-gradient-to-r from-pink-400 via-purple-600 to-blue-600 text-lg px-8 py-4'>GET STARTED FOR FREE</Button>
                    <Link href={"/demo"} className='text-gray-400 underline' >View Demo</Link>
                </div>
            </div>
        </div>
    )
}

export default GetStarted