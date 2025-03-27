import Image from 'next/image'
import React from 'react'

type Props = {}

const FeaturesHome = (props: Props) => {
    const data = [
        {
            icon : "barcode-home.svg",
            title : "Promocode.",
            desc : " Create promocodes to attract new users orretain old ones"
        },
        {
            icon : "water-home.svg",
            title : "Drip Feed.",
            desc : "  Raise social engagement at the desired speed"
        },
        {
            icon : "child-panel.svg",
            title : "Child Panel.",
            desc : " Sell your panel franchise to your customers and make money!"
        },
        {
            icon : "integrations.svg",
            title : "Integrations.",
            desc : " We have a bunch of integrations to fit in your panel"
        },
    ]
  return (
    <div className='grid md:grid-cols-4 grid-cols-1 md:p-12 p-4 gap-8'>
        {
            data.map((item, index) =>(
                <div key={index} className="space-y-3 flex items-start flex-col justify-start ">
                    <Image src={`/${item.icon}`} alt={item.title} width={100} height={100} className=''/>
                    <div className="font-bold text-lg">
                        <span className='text-blue-500'>{item.title}</span>
                        {item.desc}
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default FeaturesHome