"use client"
import React from 'react'
import { motion } from "framer-motion";
import { ShoppingBasketIcon } from 'lucide-react';
import Image from 'next/image';

type Props = {
    huge?: string
    hugeDesc?: string
    autoMatic?: string
    autoMaticDesc?: string
    support?: string
    supportDesc?: string
}

const FeatureSection = ({
    huge,
    hugeDesc,
    autoMatic,
    autoMaticDesc,
    support,
    supportDesc
}: Props) => {
    const data = [
        {
            name: huge,
            desc: hugeDesc,
            icon: "cart.svg",
        },
        {
            name: autoMatic,
            desc: autoMaticDesc,
            icon: "flash.svg",
        },
        {
            name: support,
            desc: supportDesc,
            icon: "smile.svg",
        }
    ]
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-20">
            {data.map((feature, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="bg-inherit p-12 rounded-xl flex flex-col items-center text-center shadow-lg"
                >
                    <div className="">
                        <Image src={feature.icon || "/cart.svg"} alt={feature.icon} height={40} width={40} />
                    </div>
                    <h3 className="text-xl font-semibold mt-4">
                        {feature.name}
                    </h3>
                    <p className="text-gray-400">
                        {feature.desc}
                    </p>
                </motion.div>
            ))}
        </section>
    )
}

export default FeatureSection