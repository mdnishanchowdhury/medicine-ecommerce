import { CheckCircle2, ShieldCheck, Truck, Users } from "lucide-react";
export const dynamic = "force-dynamic";
const stats = [
  { label: "Genuine Medicines", value: "100%", icon: ShieldCheck },
  { label: "Happy Customers", value: "50k+", icon: Users },
  { label: "Express Deliveries", value: "1Hr", icon: Truck },
];

export default function About() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          <div className="w-full lg:w-1/2 ">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=800"
                alt="Pharmacist working"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-blue-600 font-bold tracking-wider uppercase text-sm">About MediCare Store</h2>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Your Health, Our <span className="text-blue-600">First Priority.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded in 2010, MediCare has grown from a local pharmacy to one of the most trusted online medicine platforms. We believe that everyone should have access to high-quality healthcare, regardless of their location.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="shrink-0 size-12 bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center rounded-xl">
                  <ShieldCheck className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Authentic Products</h3>
                  <p className="text-sm text-muted-foreground">Directly sourced from top pharmaceutical manufacturers.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 size-12 bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center rounded-xl">
                  <CheckCircle2 className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Expert Pharmacists</h3>
                  <p className="text-sm text-muted-foreground">Every order is verified by a registered pharmacist.</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t flex flex-wrap gap-8 justify-between">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-2xl">
                    <stat.icon className="size-5" />
                    <span>{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}