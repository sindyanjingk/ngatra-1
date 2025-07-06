"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import Link from 'next/link'

type Props = {
    cta?: string
    buttonColor?: string;
    startNow?: string;
}

const CallToAction = ({ cta, buttonColor, startNow }: Props) => {
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
    }
    return (
        <motion.div
            className="md:text-3xl text-xl font-bold text-center p-12 border gap-x-2 flex items-center justify-around"
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            viewport={{ once: true }}
        >
            {cta}
            <Link href={"/login"}>
                <Button style={{ backgroundColor: buttonColor || "" }} className='text-xl font-bold'>{startNow}</Button>
            </Link>
        </motion.div>
    )
}

export default CallToAction