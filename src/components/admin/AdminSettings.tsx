"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Camera, Mail, Phone, Save, UserCircle } from "lucide-react";
import { Input } from "../ui/input";

type UserDataType = {
  name: string;
  id: string;
  email: string;
  phone: string | null;
  image: string | null;
  role: "vendor" | "user" | "admin";
};

const AdminSettings = ({ user }: { user: UserDataType }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imagePreview, setImagePreview] = useState("");

  return (
    <div className="min-h-screen bg-[#000000] text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-amber-400">
              Account Settings
            </h1>
            <p className="text-zinc-500 text-sm font-medium mt-1">
              Personalize your admin identity and contact information.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-zinc-800 text-zinc-400 hover:bg-zinc-900"
            >
              Cancel
            </Button>
            <Button className="bg-amber-400 text-black hover:bg-amber-500 font-bold flex gap-2 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
              <Save size={18} /> Save Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-zinc-900/20 border-zinc-800 text-white overflow-hidden">
              <CardContent className="pt-3 pb-3 flex flex-col items-center">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl relative">
                    <Image
                      src={imagePreview}
                      alt="Admin Avatar"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <label className="absolute -bottom-2 -right-2 bg-amber-400 p-2 rounded-lg text-black cursor-pointer hover:bg-amber-500 transition-all shadow-lg">
                    <Camera size={20} />
                    <input type="file" className="hidden" />
                  </label>
                </div>
                <h3 className="mt-6 font-bold text-xl">Dharmesh</h3>
                <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mt-1">
                  Super Admin
                </p>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: Edit Form Section */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="bg-zinc-900/40 border-zinc-800 text-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  Personal Information
                </CardTitle>
                <CardDescription className="text-zinc-500">
                  Visible to other administrators and in system logs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserCircle
                      className="absolute left-3 top-3 text-zinc-600"
                      size={18}
                    />
                    <Input
                      defaultValue={user.name}
                      className="bg-zinc-950/50 border-zinc-800 pl-10 focus:border-amber-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-3 text-zinc-600"
                        size={18}
                      />
                      <Input
                        disabled
                        defaultValue={user.email}
                        className="bg-zinc-950/50 border-zinc-800 pl-10 focus:border-amber-500/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-3 top-3 text-zinc-600"
                        size={18}
                      />
                      <Input
                        defaultValue={user.phone || 987654321}
                        placeholder="Enter phone number"
                        className="bg-zinc-950/50 border-zinc-800 pl-10 focus:border-amber-500/50 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
