import { User, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Ensure shadcn textarea is installed
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SettingsPage = () => {
  return (
    <div className="flex flex-col w-full h-fit bg-[#09090b] text-white p-8 space-y-8">
      {/* Page Header */}
      <div className="shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Manage your store presence and public profile.
        </p>
      </div>

      {/* Profile Settings Card */}
      <div className="max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8 shadow-2xl space-y-8">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-6">
          <div className="bg-amber-400/10 p-2 rounded-lg">
            <User className="h-5 w-5 text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-white uppercase tracking-tight">
            Profile Settings
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Shop Logo Section */}
          <div className="space-y-4">
            <Label className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest">
              Shop Logo
            </Label>
            <div className="relative group w-48 h-48">
              <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-amber-400/20 bg-zinc-800 flex items-center justify-center transition-all group-hover:border-amber-400">
                <Avatar className="h-full w-full rounded-none">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-zinc-800 text-zinc-500">
                    <ImageIcon className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <Button
                size="icon"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-amber-400 text-black hover:bg-amber-300 border-4 border-[#09090b]"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed">
              Recommended: <span className="text-zinc-300">400×400px</span>. PNG
              or JPG.
            </p>
          </div>

          {/* Form Fields Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="shop-name"
                className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest"
              >
                Shop Name
              </Label>
              <Input
                id="shop-name"
                placeholder="Rivera Electronics"
                className="bg-zinc-800/50 border-zinc-700 focus:border-amber-400 text-white h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="bio"
                className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest"
              >
                Bio
              </Label>
              <Textarea
                id="bio"
                placeholder="Premium high-performance electronics..."
                className="bg-zinc-800/50 border-zinc-700 focus:border-amber-400 text-white min-h-[150px] rounded-xl resize-none p-4 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-6 border-t border-zinc-800">
          <Button className="bg-amber-400 hover:bg-amber-300 text-black font-black px-10 py-6 rounded-xl text-sm transition-all shadow-lg shadow-amber-400/5">
            Save Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
