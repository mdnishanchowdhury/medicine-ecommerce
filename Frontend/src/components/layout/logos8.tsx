"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Logo {
  name: string;
  logo: string;
  className: string;
}

const PHARMA_LOGOS: Logo[] = [
  { name: "Pfizer", logo: "https://i.ibb.co.com/Y7BWjjms/image-removebg-preview-1.png", className: "h-8 md:h-10 w-auto" },
  { name: "Novartis", logo: "https://i.ibb.co.com/PzFr27Ps/Novartis.png", className: "h-7 md:h-9 w-auto" },
  { name: "GSK", logo: "https://i.ibb.co.com/Pz5kTTSX/GSK-Logo-2000.png", className: "h-8 md:h-10 w-auto" },
  { name: "Roche", logo: "https://i.ibb.co.com/3yJ2f2p6/images-removebg-preview.png", className: "h-7 md:h-9 w-auto" },
  { name: "Sanofi", logo: "https://i.ibb.co.com/vx15q0kz/Sanofi-logo-horizontal.png", className: "h-7 md:h-8 w-auto" },
  { name: "Bayer", logo: "https://i.ibb.co.com/xq88vpwW/logo.png", className: "h-9 md:h-11 w-auto" },
  { name: "Abbott", logo: "https://i.ibb.co.com/Z6cF2GbC/Abbott-Laboratories-logo-svg.png", className: "h-7 md:h-8 w-auto" },
  { name: "AstraZeneca", logo: "https://i.ibb.co.com/FLr3YCwj/astrazeneca.png", className: "h-7 md:h-9 w-auto" }
];

const Logos8 = ({ className }: { className?: string }) => {
  const logos = [...PHARMA_LOGOS, ...PHARMA_LOGOS];

  return (
    <section
      className={cn(
        "relative py-2 overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-white",
        className
      )}
    >

      {/* Glass Container */}
      <div className="relative">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-3xl" />

        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-82 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex gap-20 items-center whitespace-nowrap py-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear",
          }}
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 transition-all  hover:grayscale-0 hover:opacity-100 hover:scale-110"
            >
              <img
                src={logo.logo}
                alt={logo.name}
                className={logo.className}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export { Logos8 };
