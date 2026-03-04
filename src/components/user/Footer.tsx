"use client";

import Link from "next/link";
import { Diamond, Globe, Mail, Share2, ShieldCheck, Store } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-stone-800 pt-16 pb-8">
      <div className="max-w-350 mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-yellow-400 rounded-lg flex items-center justify-center text-black shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                <Diamond size={18} fill="currentColor" />
              </div>
              <h2 className="text-xl font-black tracking-tighter uppercase text-white italic">
                Shopzy Store
              </h2>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              Redefining the digital shopping experience with premium curation
              and unparalleled service since 2024.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: <Globe size={18} />, href: "#" },
                { icon: <Mail size={18} />, href: "#" },
                { icon: <Share2 size={18} />, href: "#" },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="size-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">
              Quick Links
            </h3>
            <ul className="space-y-4 text-sm text-stone-400">
              <li>
                <Link
                  href="/new-arrivals"
                  className="hover:text-yellow-400 transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/best-sellers"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="/vendor/dashboard"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Vendor Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Affiliate Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">
              Customer Care
            </h3>
            <ul className="space-y-4 text-sm text-stone-400">
              <li>
                <Link
                  href="/track-order"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Access */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">
              Platform
            </h3>
            <ul className="space-y-4 text-sm text-stone-400">
              <li>
                <Link
                  href="/admin/login"
                  className="hover:text-yellow-400 transition-colors flex items-center gap-2 group"
                >
                  <ShieldCheck
                    size={16}
                    className="text-stone-600 group-hover:text-yellow-400 transition-colors"
                  />
                  Admin Login
                </Link>
              </li>
              <li>
                <Link
                  href="/vendor/signup"
                  className="hover:text-yellow-400 transition-colors flex items-center gap-2 group"
                >
                  <Store
                    size={16}
                    className="text-stone-600 group-hover:text-yellow-400 transition-colors"
                  />
                  Vendor Signup
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-stone-500 uppercase font-bold tracking-[2px]">
          <p>© {currentYear} Shopzy Store Platform. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
