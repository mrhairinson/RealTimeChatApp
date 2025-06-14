import React, { useState } from "react";
import type { ISignInData } from "../types/type";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { useAuth } from "../store/useAuth";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

export const SignInPage: React.FC = () => {
  const { isSigningIn, signIn } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signInData, setSignInData] = useState<ISignInData>({
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!signInData.email.trim()) {
      toast.error("Email is require!");
      return false;
    }
    if (!signInData.password.trim()) {
      toast.error("Password is require!");
      return false;
    }
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!reg.test(signInData.email)) {
      toast.error("Email is not valid");
      return false;
    }
    if (signInData.password.trim().length < 6) {
      toast.error("Password length must at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmitForm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;
    await signIn(signInData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/**Left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/**LoGo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Log In</h1>
              <p className="text-base-content/60">
                Get started by using you account
              </p>
            </div>
          </div>
          {/** Form */}
          <form onSubmit={handleSubmitForm} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40 z-10" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Your Email"
                  value={signInData.email}
                  onChange={(e) =>
                    setSignInData({ ...signInData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40 z-10" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Your Password"
                  value={signInData.password}
                  onChange={(e) =>
                    setSignInData({ ...signInData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40 z-10" />
                  ) : (
                    <Eye className="size-5 text-base-content/40 z-10" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningIn}
            >
              {isSigningIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
