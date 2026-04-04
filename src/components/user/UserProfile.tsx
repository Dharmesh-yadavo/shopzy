"use client";
import {
  ChevronRight,
  Loader2,
  LogOut,
  Mail,
  Package,
  Phone,
  Settings,
  ShieldCheck,
  ShoppingCart,
  UserIcon,
  X,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { updateUserDetails } from "@/features/user/user.action";
import { useRouter } from "next/navigation";
import uploadOnCloudiinary from "@/lib/cloudinary";
import { toast } from "sonner";
import { handleUserLogoutAction } from "@/features/auth/auth.action";

interface UserType {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  image: string | null;
  role: "user" | "vendor" | "admin";
}

export const UserProfile = ({ user }: { user: UserType }) => {
  const [toggleEdit, setToggleEdit] = useState(true);
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");

  const [imgFile, setImgFile] = useState<string | undefined>("");
  const [imgPreview, setImgPreview] = useState(user.image || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const imgUrl = await uploadOnCloudiinary(file);
      if (imgUrl) {
        setImgFile(imgUrl);
        setImgPreview(imgUrl);
      }
    } catch (error) {
      console.error("Upload failed.", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImgSave = async () => {
    const res = await updateUserDetails({ userId: user.id, imgUrl: imgFile });
    if (res?.success) {
      setImgFile("");
      router.refresh();
    }
  };

  const handleUpdate = async () => {
    setToggleEdit(true);
    const res = await updateUserDetails({ userId: user.id, name, phone });
    if (res?.success) {
      router.refresh();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
      {/* 2. Left Column: Identity */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-zinc-900/10 border border-zinc-800/60 rounded-[2.5rem] p-6 flex flex-col items-center text-center">
          {/* 3. Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />

          <div className="relative h-24 w-24 rounded-full bg-linear-to-tr from-yellow-400 to-amber-600 p-0.5 mb-4">
            <div className="h-full w-full rounded-full bg-black flex items-center justify-center overflow-hidden relative">
              {imgPreview ? (
                <Image
                  src={imgPreview}
                  alt="User"
                  fill
                  className="object-cover"
                />
              ) : (
                <UserIcon size={32} className="text-zinc-700" />
              )}
            </div>
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold tracking-tight">{user.name}</h2>
          <p className="text-zinc-500 text-xs font-medium mt-0.5">
            {user.email}
          </p>

          {/* 4. Trigger Input Click */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-5 w-full py-2.5 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-zinc-700/30"
          >
            {imgFile ? "Change Selection" : "Edit Avatar"}
          </button>

          {imgFile && (
            <div className="w-full animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-[9px] text-yellow-500 font-black mt-3 uppercase tracking-widest">
                New image selected
              </p>
              <Button
                type="button"
                onClick={handleImgSave}
                disabled={isUploading}
                className="mt-2 w-full py-5 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border-none shadow-lg shadow-yellow-400/10"
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Upload & Save"
                )}
              </Button>
            </div>
          )}
        </div>

        <nav className="flex flex-col gap-1.5">
          <MenuLink
            icon={<Package size={16} />}
            label="Order History"
            href="/orders"
          />
          {/* <MenuLink
              icon={<MapPin size={16} />}
              label="Shipping Addresses"
              href="/profile/address"
            /> */}
          <MenuLink
            icon={<ShieldCheck size={16} />}
            label="Privacy & Security"
            href="/settings"
          />
          <button
            onClick={handleUserLogoutAction}
            className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl text-red-500/80 hover:text-red-500 hover:bg-red-500/5 transition-all mt-2 group"
          >
            <div className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest">
              <LogOut size={16} /> Sign Out        
            </div>
            <ChevronRight
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-all"
            />
          </button>
        </nav>
      </div>

      {/* 3. Right Column: Account Details */}
      <div className="lg:col-span-8 space-y-6">
        <section className="bg-zinc-900/10 border border-zinc-800/60 rounded-[2.5rem] p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Settings className="text-yellow-400" size={18} /> Personal
              Information
            </h3>
            <button
              onClick={() => setToggleEdit(!toggleEdit)}
              className="text-yellow-400 text-[10px] font-black uppercase tracking-widest hover:brightness-125 transition-all"
            >
              {toggleEdit ? "Edit All" : <X />}
            </button>
          </div>

          <form action={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                  <UserIcon size={14} /> Full Name
                </label>
                <Input
                  name="name"
                  disabled={toggleEdit}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`bg-zinc-950/50 border-zinc-800/80 h-11 rounded-xl font-bold focus-visible:ring-0 ${toggleEdit === false ? "border-amber-400 focus-visible:ring-1" : null}`}
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                  <Mail size={14} /> Email Address
                </label>
                <Input
                  disabled
                  value={user.email}
                  className={`bg-zinc-950/50 border-zinc-800/80  h-11 rounded-xl font-bold focus-visible:ring-0 `}
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                  <Phone size={14} /> Phone Number
                </label>
                <Input
                  name="phone"
                  disabled={toggleEdit}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className={`bg-zinc-950/50 border-zinc-800/80  h-11 rounded-xl font-bold focus-visible:ring-0  ${toggleEdit === false ? "border-amber-400 focus-visible:ring-1" : null}`}
                />
              </div>

              {/* Account Type */}
              <div className="space-y-2">
                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                  <ShieldCheck size={14} /> Account Type
                </label>
                <Input
                  disabled
                  value={user.role.toUpperCase()}
                  className="bg-yellow-400/5 border-yellow-400/20 text-yellow-500 h-11 rounded-xl font-bold focus-visible:ring-0 disabled:opacity-100"
                />
              </div>
            </div>
            {!toggleEdit && (
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase tracking-widest text-[10px] px-6 py-6 rounded-xl transition-all"
                >
                  Save Changes
                </Button>
              </div>
            )}
          </form>
        </section>

        {/* Marketing Card */}
        <div className="bg-linear-to-r from-yellow-400 to-amber-500 rounded-[2rem] p-6 md:p-8 text-black flex items-center justify-between overflow-hidden relative group cursor-pointer shadow-lg shadow-yellow-400/5">
          <div className="relative z-10 space-y-1">
            <h4 className="text-xl font-black italic uppercase leading-none tracking-tighter">
              Shopzy Elite
            </h4>
            <p className="text-black/80 text-[11px] font-bold">
              Unlimited free delivery on all orders.
            </p>
          </div>
          <button
            onClick={() => toast("Upcoming features")}
            className="relative z-10 bg-black text-white px-5 py-2.5 rounded-lg font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Upgrade
          </button>
          <ShoppingCart
            size={120}
            className="absolute -right-8 -bottom-8 text-black/10 rotate-12 group-hover:rotate-0 transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
};

const MenuLink = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="flex items-center justify-between w-full px-4 py-4 bg-zinc-900/20 border border-zinc-800/40 rounded-xl hover:border-yellow-400/30 hover:bg-zinc-900/50 transition-all group"
    >
      <div className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest group-hover:text-yellow-400 transition-colors">
        {icon} {label}
      </div>
      <ChevronRight
        size={14}
        className="text-zinc-700 group-hover:text-yellow-400 transition-colors"
      />
    </Link>
  );
};
