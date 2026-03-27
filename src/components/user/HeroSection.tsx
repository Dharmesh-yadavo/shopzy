"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const TOP_PRODUCTS = [
  {
    id: 1,
    name: "Arctic White Edition",
    price: "$249.00",
    tag: "Best Seller",
    color: "text-primary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0TcTTVs1402dU_bVQ8RbBnlDwmxMtpqioGfkGZVH9BC8whg2QBXxAI38V0zIkw3YzPOlsTvVx8uHxyTWQnAwZIqtnJpO-sKMQKDfhn4kxAQi9Vw4SfO3qp03l55jaAdnskSIcXzYsThBiuy4Id9ieqyr3SgBZXRkKonrpl-DlMs_8ujzOF-tcjRESiwOt7wsIEDwvv_wlP7x1ZY6JLYRlt7-uW508uZATUQSYufTOEmW0YijGG24h1L5PqN1QKHDEnGeqiEy51bFs",
  },
  {
    id: 2,
    name: "Studio V2 Wireless",
    price: "$399.00",
    tag: "Trending",
    color: "text-primary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXY0U-KGIrd_XRlhBNNBsd2FpcabLcw4MgiPoCUF6OwjpNBdfKa9VPzm_YfZm2OwFsCmnFFOsdOpERRL0Xd5bkz3-24QqbQh096uzy6uAySrdHG9cVY1ZAKZv50kMv9_fy2FXahjybpBfXpLOcwXc1RniRWxEMpYKZbnGHbnrzzjslbAxJI2p3-6Box8r61vEYK7d26urzXIuCSbsxxd2IJorobfj7jQZxUb6cefSmqyyomoZVCTNX_d4FXSjdJwOzuzyiQzvgKPCH",
  },
  {
    id: 3,
    name: "Nitro Speed Runner",
    price: "$120.00",
    tag: "Sale -20%",
    color: "text-red-500",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQmDTSSCy-S6g6goSgq4ubqUhzGIFVRXQjUTsYou_LD8mXKCNEl5t4JMx-V_ayCASHEOG79ABXewogcx23syrpE9jaTq4QJLm8ZKNolyIGMLZraya8VCxuYj5RHZGN5XUY09-SvGn_620u-GfY4YFTXW0OQJM_Rv7XSQEXfSXuzGNhjUfYmYaTuyuZMe3JA8f9UgP4j73RsdZeFgrnpi31RNXMfRZYoWQnBG0K3Sn0FaodR9JuaCKPQZkfAUXGgt96Ou_Cri8T2FyH",
  },
  {
    id: 4,
    name: "Vintage Capture M1",
    price: "$899.00",
    tag: "New Arrival",
    color: "text-primary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_jG1XDWbS4bvfE7ig5VMkpfJTtdE_SABLE0ppPF3O7Bx7XhBYZddh__IEb_0tSZ0uj-k8ySUZC2tOyCXNrkylNwiPIFS1V_cwKThlEehTQcwMiJXkAxfJDLTw7e1mTjQYlSOHXfptzQFxuOwWPjDToKfdrlbtEuKQPpwIudyKv6YL8aqCg1yySbU-lpiswuQ6hKlLP5rTGLSoCSqCeXpcksYEBc0hMCSo36zQCoItsSgWU_oRshaVcAfR3JozkMaIe-gzq2xrzNqQ",
  },
];

export default function HeroSection() {
  return (
    <section className="max-w-7xl pt-4 mx-auto px-6 lg:px-8 ">
      <div className="bg-[#111] rounded-[2.5rem] overflow-hidden max-h-120 flex flex-col lg:flex-row items-stretch border border-stone-800 shadow-2xl">
        {/* Left Side: Content */}
        <div className="flex-1 p-10   flex flex-col justify-center relative overflow-hidden bg-linear-to-br from-[#1a1a1a] to-black">
          <div className="relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8"
            >
              New Collection
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl  font-black text-white leading-[1.2] mb-8 tracking-tighter capitalize "
            >
              The new <br /> standard <br />
              <span className="text-yellow-400 capitalize">of style</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-stone-400 mb-8 max-w-lg leading-relaxed font-medium"
            >
              Exclusive Drops - Limited Edition.Elevate your lifestyle with our
              premium collections curated for the modern aesthetic.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-5"
            >
              <Button
                size="lg"
                className="bg-yellow-300 hover:bg-yellow-400 text-black font-black "
              >
                Shop Collection <ArrowRight size={20} />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Vertical Carousel */}
        <div className="w-full lg:w-130 bg-black/50 relative overflow-hidden border-l border-stone-800 group">
          {/* Infinite Vertical Scroll Container */}
          <div className="absolute inset-0 flex flex-col">
            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex flex-col gap-6 p-6"
            >
              {/* Double the list for seamless loop */}
              {[...TOP_PRODUCTS, ...TOP_PRODUCTS].map((product, idx) => (
                <div
                  key={idx}
                  className="aspect-4/5 w-full max-h-80 shrink-0 rounded-3xl bg-[#0a0a0a] border border-stone-800 overflow-hidden flex flex-col relative group/item cursor-pointer"
                >
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover opacity-80 group-hover/item:scale-105 group-hover/item:opacity-100 transition-all duration-700"
                  />
                  <div className="mt-auto p-8 relative z-10 bg-linear-to-t from-black via-black/80 to-transparent">
                    <span
                      className={`${product.color} text-[10px] font-black uppercase tracking-widest mb-2 block`}
                    >
                      {product.tag}
                    </span>
                    <h3 className="text-2xl font-bold text-white leading-tight mb-1">
                      {product.name}
                    </h3>
                    <p className="text-stone-400 font-medium">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Luxury Fades */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
