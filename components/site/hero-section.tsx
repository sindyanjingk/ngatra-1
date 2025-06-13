
"use client"
import { motion } from 'framer-motion'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight, Play, Star } from 'lucide-react'
import Image from 'next/image'

type Props = {
    buttonColor?: string
    most?: string
    become?: string
    startNow?: string
    fastOrder?: string
}

const HeroSection = ({ buttonColor, most, become, startNow, fastOrder }: Props) => {
    return (
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-6 py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Trust indicator */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex items-center gap-2 text-sm text-gray-600"
                        >
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <span className="font-medium">Trusted by 10,000+ businesses</span>
                        </motion.div>

                        {/* Main heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
                        >
                            {most || "The most productive way to manage your"}
                            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block">
                                digital business
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl text-gray-600 leading-relaxed max-w-lg"
                        >
                            {become || "Replace multiple tools with one centralized platform. Streamline your workflow and boost productivity with our all-in-one solution."}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Button
                                style={{ backgroundColor: buttonColor || "#7c3aed" }}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                {startNow || "Get Started Free"}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                variant="outline"
                                className="px-8 py-4 text-lg rounded-xl font-semibold border-2 border-gray-300 hover:border-purple-400 hover:text-purple-600 transition-all duration-300 group"
                            >
                                <Play className="mr-2 w-5 h-5" />
                                {fastOrder || "Watch Demo"}
                            </Button>
                        </motion.div>

                        {/* Features list */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap gap-6 text-sm text-gray-600"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>14-day free trial</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Cancel anytime</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Hero Image/Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-8 aspect-video">
                                <div className="space-y-4">
                                    {/* Mock dashboard header */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
                                        <div className="flex-1 bg-white rounded-lg p-2 text-sm text-gray-600">
                                            Dashboard Overview
                                        </div>
                                    </div>
                                    
                                    {/* Mock content */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white rounded-lg p-4 space-y-2">
                                            <div className="w-16 h-2 bg-purple-200 rounded"></div>
                                            <div className="w-12 h-6 bg-purple-600 rounded"></div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 space-y-2">
                                            <div className="w-16 h-2 bg-blue-200 rounded"></div>
                                            <div className="w-12 h-6 bg-blue-600 rounded"></div>
                                        </div>
                                    </div>
                                    
                                    {/* Mock chart */}
                                    <div className="bg-white rounded-lg p-4">
                                        <div className="flex items-end gap-1 h-16">
                                            {[...Array(8)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="bg-gradient-to-t from-purple-600 to-purple-400 rounded-sm flex-1"
                                                    style={{ height: `${Math.random() * 100}%` }}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
