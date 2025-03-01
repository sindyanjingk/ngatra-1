"use client"
import React from 'react'
import { motion } from "framer-motion";
import { ShoppingBasketIcon } from 'lucide-react';

type Props = {}

const FeatureSection = (props: Props) => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-20">
            {["catalog", "automation", "support"].map((feature, index) => (
                <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="bg-inherit p-12 rounded-xl flex flex-col items-center text-center shadow-lg"
                >
                    <div className="">
                        <ShoppingBasketIcon size={24}/>
                    </div>
                    <h3 className="text-xl font-semibold mt-4">
                        {feature === "catalog" && "Beraneka ragam"}
                        {feature === "automation" && "Semuanya berjalan otomatis"}
                        {feature === "support" && "Dukungan pelanggan terbaik"}
                    </h3>
                    <p className="text-gray-400">
                        {feature === "catalog" && "Lebih dari 100 layanan dalam katalog"}
                        {feature === "automation" && "Semuanya dilakukan secara realtime"}
                        {feature === "support" && "Agen kami akan selalu membantu Anda"}
                    </p>
                </motion.div>
            ))}
        </section>
    )
}

export default FeatureSection