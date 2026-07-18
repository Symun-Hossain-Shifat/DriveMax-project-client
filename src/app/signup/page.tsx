"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Gauge, Eye, EyeOff, Mail, Lock, AtSign, AlertCircle, User2, ImageIcon, CheckCircle2 } from "@/components/Icons";
import { useToast } from "@/components/Toast";

// Google icon as inline SVG
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function SignupPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", imageUrl: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; imageUrl?: string; password?: string }>({});

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    else if (form.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters.";
    if (!form.email) newErrors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Please enter a valid email address.";
    if (form.imageUrl && !/^https?:\/\/.+\..+/.test(form.imageUrl)) {
      newErrors.imageUrl = "Please enter a valid image URL (must start with http:// or https://).";
    }
    if (!form.password) newErrors.password = "Password is required.";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters long.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast("Account Created!", "success", `Welcome to DriveMax, ${form.name.split(" ")[0]}! Your account is ready.`);
    }, 1500);
  };

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast("Google Sign Up", "success", "Account created with Google successfully!");
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 flex flex-col">
      
      {/* Top Bar Navigation */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-zinc-900">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Gauge className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <span className="text-xl font-black tracking-wider text-white">
            DRIVE<span className="text-amber-500">MAX</span>
          </span>
        </Link>
        <Link
          href="/login"
          className="text-xs font-bold text-zinc-400 hover:text-amber-500 transition-colors"
        >
          Already have an account? <span className="text-amber-500">Sign In</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
            {/* Top glowing accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            {/* Glow background */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-500/5 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-orange-500/5 blur-[80px] pointer-events-none" />

            {/* Card Header */}
            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl mb-4">
                <User2 className="w-7 h-7 text-amber-500" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Create Your Account
              </h1>
              <p className="text-zinc-400 text-sm mt-2">
                Join DriveMax — your automotive parts hub
              </p>
            </div>

            {/* Google Sign Up Button */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-zinc-100 text-zinc-800 font-bold text-sm rounded-xl border border-zinc-200 transition-all duration-200 shadow-sm active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mb-6"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-zinc-900 text-zinc-500 font-medium uppercase tracking-widest">
                  or register with email
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Full Name Field */}
              <div>
                <label htmlFor="signup-name" className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User2 className="w-4 h-4 text-zinc-500" />
                  </div>
                  <input
                    id="signup-name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Symun Hossain Shifat"
                    className={`w-full bg-zinc-950 border rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors ${
                      errors.name
                        ? "border-rose-500/70 focus:border-rose-500"
                        : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="signup-email" className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <AtSign className="w-4 h-4 text-zinc-500" />
                  </div>
                  <input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full bg-zinc-950 border rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors ${
                      errors.email
                        ? "border-rose-500/70 focus:border-rose-500"
                        : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Image URL Field */}
              <div>
                <label htmlFor="signup-image" className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Profile Photo URL <span className="text-zinc-600 normal-case font-medium">(optional)</span>
                </label>
                <div className="flex gap-3 items-start">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <ImageIcon className="w-4 h-4 text-zinc-500" />
                    </div>
                    <input
                      id="signup-image"
                      type="url"
                      value={form.imageUrl}
                      onChange={(e) => {
                        handleChange("imageUrl", e.target.value);
                        setPreviewImg(false);
                      }}
                      placeholder="https://your-photo-url.com/image.jpg"
                      className={`w-full bg-zinc-950 border rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors ${
                        errors.imageUrl
                          ? "border-rose-500/70 focus:border-rose-500"
                          : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500"
                      }`}
                    />
                  </div>
                  {/* Preview Avatar */}
                  <div
                    className="w-11 h-11 rounded-xl border border-zinc-800 bg-zinc-950 shrink-0 overflow-hidden flex items-center justify-center"
                    title="Profile Preview"
                  >
                    {form.imageUrl && !errors.imageUrl ? (
                      <img
                        src={form.imageUrl}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                        onError={() => {}}
                        onLoad={() => setPreviewImg(true)}
                      />
                    ) : (
                      <User2 className="w-5 h-5 text-zinc-600" />
                    )}
                  </div>
                </div>
                {errors.imageUrl && (
                  <p className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.imageUrl}
                  </p>
                )}
                {previewImg && form.imageUrl && !errors.imageUrl && (
                  <p className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mt-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    Image loaded successfully
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="signup-password" className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-zinc-500" />
                  </div>
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="Create a secure password"
                    className={`w-full bg-zinc-950 border rounded-xl py-3 pl-10 pr-12 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors ${
                      errors.password
                        ? "border-rose-500/70 focus:border-rose-500"
                        : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.password}
                  </p>
                )}
                {/* Password strength hint */}
                {form.password && form.password.length > 0 && (
                  <div className="mt-2 flex gap-1.5">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          form.password.length >= (i + 1) * 3
                            ? i < 2 ? "bg-amber-500" : "bg-emerald-500"
                            : "bg-zinc-800"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/10 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "CREATE DRIVEMAX ACCOUNT"
                )}
              </button>

            </form>

            {/* Footer */}
            <p className="text-center text-xs text-zinc-500 mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-amber-500 font-bold hover:text-amber-400 transition-colors">
                Sign in →
              </Link>
            </p>
          </div>

          {/* Legal note */}
          <p className="text-center text-[11px] text-zinc-600 mt-6 leading-relaxed px-4">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-zinc-500 hover:text-zinc-300 underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-zinc-500 hover:text-zinc-300 underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
