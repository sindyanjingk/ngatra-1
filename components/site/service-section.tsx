"use client"
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const fadeInVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

const ServiceSection = ({
  ourPanel,
  likeFollowers
} : {
  ourPanel?:string
  likeFollowers?:string
}) => {
  return (
    <div className='mt-20 flex items-center justify-center flex-col'>
      <motion.div 
        className="md:text-6xl text-3xl font-bold text-center p-12"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariant}
        viewport={{ once: true }}
      >
        {ourPanel}
      </motion.div>
      <motion.div 
        className="md:text-3xl text-xl font-bold text-center p-12"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariant}
        viewport={{ once: true }}
      >
        {likeFollowers}
      </motion.div>

      <div className="flex items-center md:items-start flex-col md:flex-row justify-center gap-12 mt-12 ">
        <motion.div 
          className="flex flex-col items-center justify-center"
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariant}
          viewport={{ once: true }}
        >
          <Image src={"/promotion.svg"} alt="promotion" width={320} height={320} />
          <div className="text-3xl font-bold">Promotion</div>
          <div className="text-gray-600 text-xl font-bold">Become famous using our panel</div>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center justify-center gap-y-2"
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariant}
          viewport={{ once: true }}
        >
          <Image src={"/money.svg"} alt="money" width={320} height={320} />
          <div className="text-3xl font-bold">You can resell our services </div>
          <div className="text-3xl font-bold">to your clients</div>
          <div className="text-gray-600 text-xl font-bold">You can resell our services to you clients</div>
        </motion.div>
      </div>
    </div>
  )
}

export default ServiceSection
