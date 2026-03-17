"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface Props {
  status: "pending" | "rejected";
}

export const VerificationStatus = ({ status }: Props) => {
  const isPending = status === "pending";

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      {/* Glow Effect Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md p-0.5 rounded-2xl bg-linear-to-b from-amber-400/20 to-transparent"
      >
        <div className="bg-[#121212] rounded-2xl p-8 text-center shadow-2xl">
          {/* Icon with animated pulse glow */}
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full"
              />
              <div className="relative border-2 border-dashed border-amber-400/40 p-4 rounded-full">
                <Clock className="w-12 h-12 text-amber-400" />
              </div>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-white mb-2"
          >
            {isPending ? "Verification Pending" : "Application Rejected"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-sm mb-6 leading-relaxed"
          >
            {isPending
              ? "You can access the vendor dashboard only after admin verification."
              : "Your application did not meet our requirements at this time."}
          </motion.p>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 px-4 py-1.5 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
              Status: {status}
            </span>
          </motion.div>

          <div className="h-px bg-zinc-800 w-full mb-6" />

          <motion.p className="text-zinc-500 text-sm italic mb-8">
            {isPending
              ? "It usually takes 2–3 hours."
              : "Please contact support for details."}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};
