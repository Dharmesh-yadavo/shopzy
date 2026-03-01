/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import {
  RegisterUserData,
  RegisterUserSchema,
} from "@/features/auth/auth.schema";
import { RegisterUserAction } from "@/features/auth/server/auth.action";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserData>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "user",
    },
  });

  const onSubmit = async (values: RegisterUserData) => {
    // BACKEND CALL HERE
    // console.log("Form Values:", values);
    const res = await RegisterUserAction(values);
    if (res.status === "error") {
      toast.error(res.message);
    } else if (res.status === "success") {
      toast.success(res.message);
      redirect("/");
    }
    reset();
  };

  const selectedRole = watch("role");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0e0a] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-linear-to-b from-black from-0% via-[#171610] via-0% to-[#1f1d15] to-100%" />

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="relative w-full max-w-lg px-4"
          >
            <Card className="bg-[#1c1b14] border-stone-800 rounded-2xl shadow-2xl">
              <CardHeader className="text-center">
                <h1 className="text-yellow-400 text-3xl font-bold italic tracking-tight">
                  SHOPZY
                </h1>
                <p className="text-stone-400 text-sm">
                  Choose your path to luxury
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "User", icon: "👤", value: "user" },
                    { label: "Vendor", icon: "🏪", value: "vendor" },
                    { label: "Admin", icon: "👨‍💼", value: "admin" },
                  ].map((item) => (
                    <div
                      key={item.value}
                      onClick={() =>
                        setValue(
                          "role",
                          item.value as "user" | "vendor" | "admin",
                        )
                      }
                      className={`group p-4 rounded-xl border cursor-pointer transition-all flex flex-col items-center gap-2 ${
                        selectedRole === item.value
                          ? "bg-yellow-400/10 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.2)]"
                          : "bg-white/5 border-white/10 hover:border-white/30"
                      }`}
                    >
                      <span className="text-3xl">{item.icon}</span>
                      <span
                        className={`text-sm font-medium ${selectedRole === item.value ? "text-yellow-400" : "text-stone-300"}`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => setStep(2)}
                  className="w-full h-12 bg-yellow-400 text-black hover:bg-yellow-300 font-bold"
                >
                  Next Step <TbPlayerTrackNextFilled className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="relative w-full max-w-lg px-4"
          >
            <Card className="bg-[#1c1b14] border-stone-800 rounded-2xl shadow-2xl">
              <CardHeader>
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center text-stone-500 hover:text-white text-sm mb-2 transition"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <h2 className="text-2xl font-bold text-white">
                  Complete Profile
                </h2>
                <p className="text-stone-400 text-sm text-balance">
                  Creating your {selectedRole} account
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    {...register("fullName")}
                    placeholder="Full Name"
                    className="border-stone-700 text-white h-12 "
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}

                  <Input
                    {...register("email")}
                    placeholder="Email Address"
                    className=" border-stone-700 text-white h-12"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}

                  <div className="relative">
                    <Input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className=" border-stone-700 text-white h-12"
                    />
                    {errors.password && (
                      <p className="text-xs pt-2 text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-yellow-400 text-black font-bold hover:bg-yellow-300 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-stone-800" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#1c1b14] px-2 text-stone-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full h-12 bg-transparent text-white border-yellow-400/40 hover:text-white hover:bg-yellow-400/10"
                >
                  <FcGoogle className="mr-2 text-xl" /> Continue with Google
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegisterPage;
