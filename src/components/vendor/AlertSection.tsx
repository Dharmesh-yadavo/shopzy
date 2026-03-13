// components/vendor/AlertSection.tsx
import { AlertCircle, Clock, MessageCircle } from "lucide-react";

export const AlertSection = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-4 w-4 text-amber-400" />
        <h2 className="text-lg font-bold text-white">Urgent Notifications</h2>
      </div>

      <div className="bg-zinc-900/20 border border-zinc-800 rounded-xl divide-y divide-zinc-800/50">
        <div className="p-4 flex justify-between items-center group cursor-pointer hover:bg-zinc-800/30">
          <div className="flex gap-4 items-center">
            <div className="bg-amber-400/10 p-2 rounded-lg">
              <Clock className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">7 Pending Orders</p>
              <p className="text-xs text-zinc-500">
                Orders waiting for your verification
              </p>
            </div>
          </div>
          <button className="text-[10px] font-bold text-amber-400 uppercase tracking-wider group-hover:underline">
            Process Now
          </button>
        </div>

        <div className="p-4 flex justify-between items-center group cursor-pointer hover:bg-zinc-800/30">
          <div className="flex gap-4 items-center">
            <div className="bg-blue-400/10 p-2 rounded-lg">
              <MessageCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">New Inquiry</p>
              <p className="text-xs text-zinc-500">
                From customer: problemgamer2502@gmail.com
              </p>
            </div>
          </div>
          <button className="text-[10px] font-bold text-blue-400 uppercase tracking-wider group-hover:underline">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};
