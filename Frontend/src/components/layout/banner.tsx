import { ShieldCheck, Truck, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

export default function HeroMedicine({ className }: HeroProps) {
  return (
    <section className={cn("relative w-full overflow-hidden bg-[#f8fafc] dark:bg-black ", className)}>
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 bg-green-100 rounded-full blur-3xl opacity-50" />

      <div className="container relative mx-auto px-4 pt-8 md:pt-30 ">
        <div className="grid lg:grid-cols-2 md:gap-12 items-center">

          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-green-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
              </span>
              Online Pharmacy in Bangladesh
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] dark:text-white">
                Your Health, <br />
                <span className="text-green-600">Our Priority.</span>
              </h1>
              <p className="text-slate-600 text-lg lg:text-xl max-w-lg leading-relaxed dark:text-white">
                Order genuine medicines and healthcare essentials from the comfort of your home. Fast, secure, and reliable delivery.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 border-t border-slate-200 dark:text-white">
              <FeatureItem icon={<ShieldCheck />} text="100% Authentic" />
              <FeatureItem icon={<Truck />} text="Express Delivery" />
              <FeatureItem icon={<CreditCard />} text="Secure Payment" />
            </div>
          </div>

          <div>
            <img
              src="https://i.ibb.co.com/FkVXLQXx/img.png"
              alt="Healthcare"
              className="md:w-175 md:h-175 object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-700 font-medium">
      <span className="text-green-600 size-5">{icon}</span>
      <span className="text-sm dark:text-white">{text}</span>
    </div>
  );
}