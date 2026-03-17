"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store, MapPin, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  vendorUpdateDetailsData,
  vendorUpdateDetailsSchema,
} from "@/features/vendor/vendor.schema";
import { EditVendorDetailsAction } from "@/features/vendor/vendor.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const EditVendorDetails = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<vendorUpdateDetailsData>({
    resolver: zodResolver(vendorUpdateDetailsSchema),
  });

  const router = useRouter();

  const onSubmit = async (values: vendorUpdateDetailsData) => {
    console.log("Form Data:", values);
    const res = await EditVendorDetailsAction(values);
    if (res.status === "error") {
      toast.error(res.message);
    } else if (res.status === "success") {
      toast.success(res.message);
      router.push("/vendor");
      router.refresh();
    }
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md"
      >
        <Card className="bg-[#1c1c1c] border-none text-white shadow-2xl overflow-hidden">
          <CardHeader className="text-center space-y-2">
            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl font-bold tracking-tight">
                Complete Your Shop Details
              </CardTitle>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardDescription className="text-gray-400 text-sm">
                Enter your business information to activate your vendor account.
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent>
            {/* Added space-y-5 to the form for consistent vertical rhythm */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Shop Name */}
              <motion.div variants={itemVariants} className="space-y-1">
                <div className="relative group">
                  <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-400 transition-colors w-5 h-5" />
                  <Input
                    {...register("shopName")}
                    placeholder="Shop Name"
                    disabled={isSubmitting}
                    className="bg-[#2a2a2a] border-gray-700 border-2 pl-12 h-14 focus-visible:ring-0 text-white focus-visible:border-amber-400 placeholder:text-gray-500 rounded-xl transition-all"
                  />
                </div>
                <AnimatePresence>
                  {errors.shopName && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[11px] text-red-500 font-semibold tracking-wider pl-1"
                    >
                      {errors.shopName.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Business Address */}
              <motion.div variants={itemVariants} className="space-y-1">
                <div className="relative group">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-400 transition-colors w-5 h-5" />
                  <Input
                    {...register("shopAddress")}
                    placeholder="Business Address"
                    disabled={isSubmitting}
                    className="bg-[#2a2a2a] border-gray-700 border-2 pl-12 h-14 focus-visible:ring-0 text-white focus-visible:border-amber-400 placeholder:text-gray-500 rounded-xl transition-all"
                  />
                </div>
                <AnimatePresence>
                  {errors.shopAddress && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-[11px] text-red-500 font-semibold tracking-wider pl-1"
                    >
                      {errors.shopAddress.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* GST Number */}
              <motion.div variants={itemVariants} className="space-y-1">
                <div className="relative group">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-400 transition-colors w-5 h-5" />
                  <Input
                    {...register("gstNumber")}
                    placeholder="GST NUMBER"
                    disabled={isSubmitting}
                    className="bg-[#2a2a2a] border-gray-700 border-2 pl-12 h-14 focus-visible:ring-0 text-white focus-visible:border-amber-400 placeholder:text-gray-500 rounded-xl transition-all"
                  />
                </div>
                <AnimatePresence>
                  {errors.gstNumber && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-[11px] text-red-500 font-semibold tracking-wider pl-1"
                    >
                      {errors.gstNumber.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <motion.div
                  whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-400 hover:bg-amber-500 disabled:bg-amber-800 disabled:opacity-70 text-black h-12 text-lg font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(251,191,36,0.2)] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Details"
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EditVendorDetails;
