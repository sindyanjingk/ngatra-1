
"use client"
import React from 'react'
import { motion } from "framer-motion";
import { Zap, Shield, Headphones, ArrowRight } from 'lucide-react';
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
    const features = [
        {
            name: huge || "Huge Selection",
            desc: hugeDesc || "Access thousands of premium services across all major platforms",
            icon: Zap,
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            textColor: "text-purple-600"
        },
        {
            name: autoMatic || "Fully Automatic",
            desc: autoMaticDesc || "AI-powered automation that works 24/7 without any manual intervention",
            icon: Shield,
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            textColor: "text-blue-600"
        },
        {
            name: support || "Premium Support",
            desc: supportDesc || "Get instant help from our expert team whenever you need assistance",
            icon: Headphones,
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
            textColor: "text-green-600"
        }
    ]

    return (
        <section className="py-20 px-6 bg-gray-50">
            <div className="container mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Everything you need in
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block">
                            one powerful platform
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Stop juggling multiple tools. Our comprehensive platform provides everything 
                        you need to scale your digital presence efficiently.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 h-full">
                                    {/* Icon */}
                                    <div className={`${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className={`w-8 h-8 ${feature.textColor}`} />
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                            {feature.name}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.desc}
                                        </p>

                                        {/* Learn more link */}
                                        <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
                                            <span>Learn more</span>
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>

                                    {/* Gradient border on hover */}
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-purple-600 to-blue-600 p-[2px]">
                                        <div className="w-full h-full bg-white rounded-2xl"></div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
                        <h3 className="text-2xl font-bold mb-4">
                            Ready to transform your workflow?
                        </h3>
                        <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                            Join thousands of businesses that have already streamlined their operations 
                            with our powerful platform.
                        </p>
                        <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                            Start Free Trial
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default FeatureSection
