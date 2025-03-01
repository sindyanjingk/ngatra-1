"use client"
import { motion } from 'framer-motion'
import React from 'react'
import { Button } from '../ui/button'

type Props = {
    buttonColor?: string
}

const HeroSection = ({ buttonColor }: Props) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center py-20 px-20"
        >
            <h1 className="text-3xl md:text-5xl font-bold">
                BELI LAYANAN SOSMED DAN BUAT WEBSITE SOSMED GRATIS DISINI 🇮🇩
            </h1>
            <p className="text-gray-400 mt-4 max-w-2xl">
                ldcsosmed website social media marketing, dimana semua kebutuhan social media anda terpenuhi disini.
            </p>
            <div className="mt-6 flex flex-col md:flex-row gap-4">
                <Button style={{backgroundColor : buttonColor || ""}} className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-6 text-lg">Daftar sekarang</Button>
                <Button style={{backgroundColor : buttonColor || ""}} className="px-12 py-6 text-lg bg-gray-600 hover:bg-gray-400">Beli sekarang</Button>
            </div>
        </motion.section>
    )
}

export default HeroSection