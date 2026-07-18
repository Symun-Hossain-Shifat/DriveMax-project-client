"use client";

import React, { useState } from "react";
import { ChevronDown, Send, Sparkles, AlertCircle, CheckCircle2 } from "./Icons";
import { useToast } from "./Toast";

export default function FAQAndNewsletter() {
  const { showToast } = useToast();
  
  // Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the 'My Garage' compatibility filter work?",
      a: "Once you register your vehicle's year, make, and model in the dashboard or lookup wizard, our database scans product specifications. Items that fit will display a green verification check. Items that do not fit will alert you, preventing return issues."
    },
    {
      q: "Are the components you sell covered by warranty?",
      a: "Yes! All OEM parts and certified aftermarket parts come with a minimum 12-month manufacturer replacement warranty against material defects or early mechanical failure."
    },
    {
      q: "Do you ship products internationally?",
      a: "We currently support standard and express insured courier transit to the United States, Canada, European Union, United Kingdom, Ukraine, Japan, and Australia. Custom customs fees are computed at check-out."
    },
    {
      q: "What is your return policy if a part does not fit?",
      a: "We offer a 30-day exchange or refund window. If a part doesn't fit, simply go to your Orders tracking page, print a pre-paid shipping label, and drop it at any partner carrier hub."
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  // Newsletter State
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !regex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      showToast("Subscription Active!", "success", "Welcome to DriveMax newsletter!");
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }, 1500);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-b border-zinc-900 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* FAQ Column (Takes 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-black tracking-widest text-amber-500 bg-amber-500/10 px-3.5 py-1.5 rounded-full uppercase">
                Support Hub
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-4 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-zinc-400 text-sm">
                Can't find the answer you need? Get in touch with our live mechanics team 24/7.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;

                return (
                  <div
                    key={idx}
                    className="bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden transition-colors hover:border-zinc-700/80"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-white focus:outline-none cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-amber-500 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Accordion Content with smooth expand */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="p-5 pt-0 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-950/60 bg-zinc-950/20">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Newsletter Column (Takes 5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-zinc-900 via-zinc-950 to-orange-950/15 border border-zinc-800/80 p-8 rounded-3xl relative overflow-hidden shadow-2xl self-stretch flex flex-col justify-between">
            {/* Glowing spot background */}
            <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

            <div>
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-amber-500 tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                Vip Club
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-3">
                Unlock 15% Welcome Discount
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Join 50k+ auto owners. Subscribing feeds you flash sales notification, DIY mechanical tips, and exclusive brand coupons.
              </p>
            </div>

            <div className="mt-8">
              {subscribed ? (
                <div className="bg-emerald-950/50 border border-emerald-500/30 p-4.5 rounded-2xl text-center flex flex-col items-center gap-2.5 animate-in zoom-in-95">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  <div>
                    <h5 className="font-bold text-white text-sm">Welcome to DriveMax Club!</h5>
                    <p className="text-[11px] text-emerald-200 mt-1">Check your inbox for a 15% discount code voucher.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3.5">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorMsg("");
                      }}
                      placeholder="Enter your email address"
                      className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:outline-none rounded-xl py-3.5 pl-4 pr-12 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 transition-colors"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-2 p-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black rounded-lg transition-colors cursor-pointer"
                      disabled={loading}
                      title="Subscribe"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  {errorMsg && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <p className="text-[10px] text-zinc-500 leading-normal text-center sm:text-left">
                    We hate spam. Unsubscribe at any time. Read our privacy policy page.
                  </p>
                </form>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
              <span>Weekly updates</span>
              <span className="text-amber-500/80">No commitment</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
