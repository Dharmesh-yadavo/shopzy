"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { loginUserSchema } from "@/features/auth/auth.schema";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = (values: z.infer<typeof loginUserSchema>) => {
    startTransition(async () => {
      console.log("Logging in:", values);
      // await loginUser(values);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0e0a] relative overflow-hidden">
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md px-4"
      >
        <Card className="bg-[#1c1b14] border-stone-800 rounded-2xl shadow-2xl">
          <CardHeader className="text-center">
            <h1 className="text-yellow-400 text-3xl font-bold italic tracking-tighter">
              SHOPZY
            </h1>
            <h2 className="text-white text-xl font-semibold">Welcome Back</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  {...register("email")}
                  placeholder="Email Address"
                  className=" border-stone-700 text-white h-12 "
                />
                {errors.email && (
                  <p className="text-[10px] text-red-500 pt-2  font-semibold tracking-wider">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className=" border-stone-700 text-white h-12 "
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-yellow-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[10px] text-red-500 pt-2  font-semibold tracking-wider">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 bg-yellow-400 text-black font-bold text-lg hover:bg-yellow-300 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="relative my-6 flex items-center justify-center">
              <span className="w-full border-t border-stone-800 absolute" />
              <span className="bg-[#1c1b14] px-3 text-[10px] text-stone-500 uppercase z-10 font-bold">
                Or Login With
              </span>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 bg-transparent text-white border-yellow-400/40 hover:text-white hover:bg-yellow-400/10 "
            >
              <FcGoogle className="mr-2 text-xl" /> Continue with Google
            </Button>

            <p className="text-center text-stone-400 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-yellow-400 hover:underline"
              >
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
