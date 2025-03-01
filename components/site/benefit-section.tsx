"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'

type Props = {
    buttonColor?: string
}

const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
}

const BenefitSection = ({ buttonColor }: Props) => {
    return (
        <div className='mt-20 flex items-center justify-center flex-col'>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-6xl font-bold text-center p-12"
            >
                Keuntungan
            </motion.div>
            <div className="flex flex-col md:flex-row md:items-start items-center justify-center gap-12 mt-12">
                {[
                    { title: "High Quality", desc: "We always keep track of our service quality", img: "/diamond.svg" },
                    { title: "User Friendly", desc: "Designed to be easy and intuitive to use", img: "/interface.svg" },
                    { title: "Affordable Price", desc: "Best value for the quality we provide", img: "/bag.svg" }
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Card className='flex items-center justify-center flex-col bg-gray-800 border-none shadow-lg md:h-[400px] md:w-[280px]'>
                            <CardHeader>
                                <CardTitle className='text-2xl text-white font-bold'>{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className='flex items-center justify-center flex-col gap-y-8'>
                                <CardDescription className='text-center text-gray-600 text-xl font-semibold'>{item.desc}</CardDescription>
                                <Image src={item.img} alt={item.title} width={180} height={180} />
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
            >
                <Button style={{ backgroundColor: buttonColor  || ""}} className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-6 text-lg mt-8">
                    Daftar sekarang
                </Button>
            </motion.div>
        </div>
    )
}

export default BenefitSection