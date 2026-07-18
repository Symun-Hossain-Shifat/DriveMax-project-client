'use client';
import React, { useState } from 'react';
import Link from 'next/link'; // Imported for Next.js routing
import { Mail, Phone, MapPin, Send, ArrowLeft } from 'lucide-react'; // Added ArrowLeft icon

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        vehicleType: 'car', // default value
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., API route)
        console.log('Submitted Data:', formData);
    };

    return (
        <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Back to Home Button at the top */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Get in Touch</h1>
                    <p className="mt-3 text-lg text-slate-600">
                        Have questions about part compatibility, tracking, or a specific order? We are here to help.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">

                    {/* Contact Information Panel */}
                    <div className="bg-blue-600 rounded-2xl p-8 text-white lg:col-span-1 shadow-md">
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                        <p className="text-blue-100 mb-8 leading-relaxed">
                            Reach out to our support team directly. We typically reply within 24 business hours.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <Mail className="w-6 h-6 mt-0.5 text-blue-200" />
                                <div>
                                    <p className="text-sm font-medium text-blue-200">Email Support</p>
                                    <a href="mailto:support@drivemax.com" className="text-base font-semibold hover:underline">support@drivemax.com</a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Phone className="w-6 h-6 mt-0.5 text-blue-200" />
                                <div>
                                    <p className="text-sm font-medium text-blue-200">Call Us</p>
                                    <a href="tel:+1234567890" className="text-base font-semibold hover:underline">+1 (234) 567-890</a>
                                    <p className="text-xs text-blue-200 mt-0.5">Mon - Sat: 9:00 AM - 6:00 PM</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <MapPin className="w-6 h-6 mt-0.5 text-blue-200" />
                                <div>
                                    <p className="text-sm font-medium text-blue-200">Headquarters</p>
                                    <p className="text-base font-medium">123 Auto Plaza, Suite 400<br />Tech District, City Center</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Panel */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm lg:col-span-2">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">I am looking for components for a:</label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center space-x-2 cursor-pointer bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 flex-1 justify-center hover:bg-slate-100 transition-colors">
                                        <input
                                            type="radio"
                                            name="vehicleType"
                                            value="car"
                                            checked={formData.vehicleType === 'car'}
                                            onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium text-slate-800">Car Parts</span>
                                    </label>

                                    <label className="flex items-center space-x-2 cursor-pointer bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 flex-1 justify-center hover:bg-slate-100 transition-colors">
                                        <input
                                            type="radio"
                                            name="vehicleType"
                                            value="bike"
                                            checked={formData.vehicleType === 'bike'}
                                            onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium text-slate-800">Bike Parts</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Your Message or Part Details</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900"
                                    placeholder="Tell us what you're looking for or paste part/VIN numbers here..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl inline-flex items-center justify-center space-x-2 transition-colors shadow-sm"
                            >
                                <span>Send Message</span>
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}