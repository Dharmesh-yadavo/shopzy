import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Bell, Shield, Globe, Save } from "lucide-react";

const AdminSettingsPage = () => {
  const initialSettings = {
    profile: {
      adminName: "Dharmesh",
      email: "admin@shopzy.io",
      role: "Super Admin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dharmesh",
    },
    system: {
      maintenanceMode: false,
      emailNotifications: true,
      orderAlerts: true,
      currency: "INR (₹)",
    },
  };

  return (
    <div className="flex flex-col w-full h-fit bg-[#000000] text-white p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Manage your account and platform preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="flex flex-col space-y-2">
          <button className="flex items-center gap-3 px-4 py-3 bg-zinc-900 text-amber-400 rounded-lg font-medium transition-all">
            <User size={18} /> Profile Details
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-zinc-900/50 rounded-lg transition-all">
            <Shield size={18} /> Security & Password
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-zinc-900/50 rounded-lg transition-all">
            <Bell size={18} /> Notifications
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-zinc-900/50 rounded-lg transition-all">
            <Globe size={18} /> Regional Settings
          </button>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Section */}
          <Card className="bg-zinc-900/40 border-zinc-800 text-white">
            <CardHeader>
              <CardTitle className="text-lg">General Information</CardTitle>
              <CardDescription className="text-zinc-500">
                Update your public admin profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">
                    Admin Name
                  </label>
                  <Input
                    defaultValue="Dharmesh"
                    className="bg-zinc-950 border-zinc-800 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">
                    Role
                  </label>
                  <Input
                    value="Super Admin"
                    disabled
                    className="bg-zinc-900/50 border-zinc-800 text-zinc-500 cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Email Address
                </label>
                <Input
                  defaultValue="admin@shopzy.io"
                  className="bg-zinc-950 border-zinc-800 focus:ring-amber-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences Section */}
          <Card className="bg-zinc-900/40 border-zinc-800 text-white">
            <CardHeader>
              <CardTitle className="text-lg">System Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Maintenance Mode</p>
                  <p className="text-xs text-zinc-500">
                    Temporarily disable the storefront for users.
                  </p>
                </div>
                <div className="w-10 h-5 bg-zinc-800 rounded-full flex items-center px-1">
                  <div className="w-3 h-3 bg-zinc-600 rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Email Alerts</p>
                  <p className="text-xs text-zinc-500">
                    Receive emails for new vendor approval requests.
                  </p>
                </div>
                <div className="w-10 h-5 bg-amber-500/20 rounded-full flex items-center justify-end px-1 border border-amber-500/50">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              className="border-zinc-800 text-zinc-400 hover:bg-zinc-900"
            >
              Discard Changes
            </Button>
            <Button className="bg-amber-400 text-black hover:bg-amber-500 font-bold flex gap-2">
              <Save size={16} /> Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
