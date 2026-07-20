"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Gauge, Eye, EyeOff, Mail, Lock, AtSign, AlertCircle, CheckCircle2 } from "@/components/Icons";
import { useToast } from "@/components/Toast";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

// Google icon as inline SVG
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default function LoginPage() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email address.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    // Simulate authentication request
    setTimeout(() => {
      setIsLoading(false);
      showToast("Sign In Successful!", "success", `Welcome back! Redirecting to your dashboard…`);
    }, 1500);
    const { data, error } = await authClient.signIn.email({
      email: email, // required
      password: password, // required
      rememberMe: true,
      callbackURL: "/",
    });
    console.log(data, error)
    if (data) {
      toast.success('Login Successfull')
      redirect('/')
    } else if (error) {
      toast.error(`Login Failed . ${error}`)
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast("Google Sign In", "success", "Signed in with Google successfully!");
    }, 1200);
    const data = await authClient.signIn.social({
      provider: "google",
    });
    if (data) {
      toast.success('Login Successfull')
      redirect('/')
    }
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
          href="/signup"
          className="text-xs font-bold text-zinc-400 hover:text-amber-500 transition-colors"
        >
          Don't have an account? <span className="text-amber-500">Sign Up</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
            {/* Top glowing accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            {/* Glow background */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-500/5 blur-[80px] pointer-events-none" />

            {/* Card Header */}
            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl mb-4">
                <Lock className="w-7 h-7 text-amber-500" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome Back
              </h1>
              <p className="text-zinc-400 text-sm mt-2">
                Sign in to your DriveMax account to continue
              </p>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
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
                  or sign in with email
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email Field */}
              <div>
                <label htmlFor="login-email" className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <AtSign className="w-4 h-4 text-zinc-500" />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
                    placeholder="you@example.com"
                    className={`w-full bg-zinc-950 border rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors ${errors.email
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

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="login-password" className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#" className="text-[11px] font-bold text-amber-500 hover:text-amber-400 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-zinc-500" />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })); }}
                    placeholder="Enter your password"
                    className={`w-full bg-zinc-950 border rounded-xl py-3 pl-10 pr-12 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors ${errors.password
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
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/10 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "SIGN IN TO DRIVEMAX"
                )}
              </button>

            </form>

            {/* Footer */}
            <p className="text-center text-xs text-zinc-500 mt-6">
              Don't have an account?{" "}
              <Link href="/signup" className="text-amber-500 font-bold hover:text-amber-400 transition-colors">
                Create one now →
              </Link>
            </p>

          </div>

          {/* Legal note */}
          <p className="text-center text-[11px] text-zinc-600 mt-6 leading-relaxed px-4">
            By signing in, you agree to our{" "}
            <a href="#" className="text-zinc-500 hover:text-zinc-300 underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-zinc-500 hover:text-zinc-300 underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
