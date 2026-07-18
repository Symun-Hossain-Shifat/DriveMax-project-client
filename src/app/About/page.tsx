'use client';
import React from 'react';
import Link from 'next/link'; // Imported for Next.js routing
import { Shield, Truck, Wrench, ThumbsUp, ArrowLeft } from 'lucide-react'; // Added ArrowLeft icon

export default function AboutUs() {
    const values = [
        {
            icon: <Shield className="w-6 h-6 text-blue-600" />,
            title: "100% Genuine Parts",
            description: "We source directly from certified manufacturers to ensure your vehicle gets original quality components."
        },
        {
            icon: <Truck className="w-6 h-6 text-blue-600" />,
            title: "Fast Nationwide Delivery",
            description: "Getting your ride back on the road is our priority. Fast, tracked shipping right to your doorstep."
        },
        {
            icon: <Wrench className="w-6 h-6 text-blue-600" />,
            title: "Expert Support",
            description: "Not sure if a part fits? Our dedicated support team helps you match the exact part to your model."
        },
        {
            icon: <ThumbsUp className="w-6 h-6 text-blue-600" />,
            title: "Customer First",
            description: "From easy returns to secure checkouts, we design our experience around your peace of mind."
        }
    ];

    return (
        <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Back to Home Button */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </Link>
                </div>

                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                        Keep Your Journey Moving with <span className="text-blue-600">DriveMax</span>
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                        We are your ultimate digital destination for high-quality car and motorcycle parts. Whether you are doing a routine oil change, upgrading your performance, or handling a major repair, DriveMax connects you with the exact components you need.
                    </p>
                </div>

                {/* Mission Statement */}
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 mb-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Founded with a passion for motorsports and reliable engineering, DriveMax was built to solve a common problem: finding high-quality, authentic vehicle parts without the hassle.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                We bridge the gap between premium global manufacturers and vehicle owners, providing a seamless digital platform where compatibility and quality are guaranteed.
                            </p>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <p className="text-3xl font-bold text-blue-600">50K+</p>
                                <p className="text-sm font-medium text-slate-500 mt-1">Active Parts</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <p className="text-3xl font-bold text-blue-600">10K+</p>
                                <p className="text-sm font-medium text-slate-500 mt-1">Happy Drivers</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <p className="text-3xl font-bold text-blue-600">100%</p>
                                <p className="text-sm font-medium text-slate-500 mt-1">Verified Genuine</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <p className="text-3xl font-bold text-blue-600">24/7</p>
                                <p className="text-sm font-medium text-slate-500 mt-1">Order Tracking</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Core Values Section */}
                <div>
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Why Choose DriveMax?</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}