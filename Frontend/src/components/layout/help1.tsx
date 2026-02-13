"use client";

import {
  ChevronRight,
  HelpCircle,
  RotateCcw,
  Search,
  Truck,
  Pill,
  ClipboardList,
  ShieldCheck,
  Activity,
  PhoneCall,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface HelpCategory {
  icon: React.ReactNode;
  title: string;
  description: string;
  articles: number;
}

interface PopularTopic {
  title: string;
  href: string;
}

interface Help1Props {
  title?: string;
  categories?: HelpCategory[];
  popularTopics?: PopularTopic[];
  className?: string;
}

const MEDICINE_CATEGORIES: HelpCategory[] = [
  {
    icon: <ClipboardList className="size-6" />,
    title: "Prescriptions",
    description: "How to upload and verify your prescription",
    articles: 8,
  },
  {
    icon: <Pill className="size-6" />,
    title: "Medicines & Dosage",
    description: "Information about medicine usage and side effects",
    articles: 25,
  },
  {
    icon: <Truck className="size-6" />,
    title: "Express Delivery",
    description: "Cold-chain and emergency delivery tracking",
    articles: 5,
  },
  {
    icon: <RotateCcw className="size-6" />,
    title: "Returns & Refunds",
    description: "Policy for returning medicines and healthcare products",
    articles: 10,
  },
  {
    icon: <ShieldCheck className="size-6" />,
    title: "Authenticity",
    description: "How we ensure 100% genuine medications",
    articles: 6,
  },
  {
    icon: <Activity className="size-6" />,
    title: "Health Services",
    description: "Consultations, lab tests, and health packages",
    articles: 12,
  },
];

const POPULAR_PHARMACY_TOPICS: PopularTopic[] = [
  { title: "How do I upload my doctor's prescription?", href: "#" },
  { title: "Can I return a medicine if the seal is broken?", href: "#" },
  { title: "Estimated delivery time for emergency medicines", href: "#" },
  { title: "How to check the expiry date of my order?", href: "#" },
  { title: "Payment methods for insurance claims", href: "#" },
  { title: "Consult with a licensed pharmacist online", href: "#" },
];

const Help1 = ({
  title = "Pharmacy Help Center",
  categories = MEDICINE_CATEGORIES,
  popularTopics = POPULAR_PHARMACY_TOPICS,
  className,
}: Help1Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className={cn("py-12 md:py-20 bg-slate-50/50 dark:bg-transparent", className)}>
      <div className="container w-full mx-auto px-4">
        {/* Header with Search */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-slate-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Search for medications, prescriptions, or order help.
          </p>

          <div className="mx-auto mt-6 max-w-lg">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for medicines or help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-12 text-base shadow-sm border-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group cursor-pointer border-slate-200 transition-all hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800"
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800 dark:text-slate-100">{category.title}</h3>
                      <ChevronRight className="size-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {category.description}
                    </p>
                    <p className="mt-2 text-xs font-bold text-blue-500 uppercase tracking-wide">
                      {category.articles} Articles
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Topics Box */}
        <div className="rounded-xl border border-slate-200 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100">
            <HelpCircle className="size-5 text-blue-500" />
            Frequently Asked Questions
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {popularTopics.map((topic, index) => (
              <a
                key={index}
                href={topic.href}
                className="flex items-center gap-2 rounded-md p-2 text-sm text-slate-600 dark:text-slate-400 transition-colors hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <ChevronRight className="size-3 text-slate-300" />
                {topic.title}
              </a>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-10 rounded-2xl bg-blue-600 p-8 text-center text-white shadow-lg shadow-blue-200 dark:shadow-none">
          <h3 className="text-xl font-bold">Still Need Help?</h3>
          <p className="mt-2 text-blue-100">
            Our licensed pharmacists are available 24/7 to answer your medical queries.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              <PhoneCall className="mr-2 size-4" />
              Call a Pharmacist
            </Button>
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-blue-700">
              Email Support
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Help1 };