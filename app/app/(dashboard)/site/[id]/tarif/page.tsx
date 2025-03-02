import Image from 'next/image'
import React from 'react'


const Tarif = () => {
    return (
        <div className="spce-y-4 flex flex-col items-center justify-center">
            <div className="p-4 border rounded-xl flex items-center justify-between  md:w-2/4">
                <div className="flex items-center gap-x-4">
                    <Image src={"/percent.svg"} alt='percent' width={40} height={40} />
                    <div className="text-xl font-bold">Ngatra Comision</div>
                </div>
                <div className="text-xl font-bold">5%</div>
            </div>
            <div className="border rounded-xl md:w-2/4 mt-4">
                <div className='space-y-3 p-4 border-b'>
                    <Image src={"/commision.svg"} alt='commision' width={40} height={40} />
                    <div className="text-xl font-bold">We take a commission on the final amount of the order</div>
                    <div className="text-md font-semibold">Commission is calculated when order is created and it
                    will be recalculated if order gets canceled or partial</div>
                </div>
                <div className='space-y-3 p-4'>
                    <Image src={"/calendar.svg"} alt='calendar' width={40} height={40} />
                    <div className="text-xl font-bold">The commission is paid from the account every day</div>
                    <div className="text-md font-semibold">If the comission payment was overdue, the panel goes to inactive state</div>
                </div>
            </div>
        </div>
    )
}

export default Tarif