"use client"
import { cn } from "@/lib/utils";
import { Logo, LogoImage, LogoText } from "@/components/layout/logo";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer2 = ({
  logo = {
    src: "https://i.ibb.co.com/yc1H9XZm/Chat-GPT-Image-Feb-6-2026-09-05-22-PM.png",
    alt: "MediCare Store",
    // title: "MediCare",
    url: "/",
  },
  className,
  tagline = "Your trusted partner in health. Delivering genuine medicines and healthcare essentials to your doorstep.",
  menuItems = [
    {
      title: "Shop by Category",
      links: [
        { text: "Prescription Medicine", url: "/category/medicine" },
        { text: "Baby & Mother Care", url: "/category/baby-mother-care" },
        { text: "Diabetes Care", url: "/category/diabetes" },
        { text: "Personal Care", url: "/category/personal-care" },
        { text: "Wellness & Supplements", url: "/category/wellness" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { text: "How to Order", url: "/how-to-order" },
        { text: "Return & Refund Policy", url: "/refund-policy" },
        { text: "Shipping Information", url: "/shipping" },
        { text: "Order Tracking", url: "/track-order" },
        { text: "FAQs", url: "/faq" },
      ],
    },
    {
      title: "About Us",
      links: [
        { text: "Company Profile", url: "/about" },
        { text: "Contact Us", url: "/contact" },
        { text: "Our Blogs", url: "/blog" },
        { text: "Health Tips", url: "/health-tips" },
        { text: "Store Locator", url: "/stores" },
      ],
    },
    {
      title: "Follow Us",
      links: [
        { text: "Facebook", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "Twitter (X)", url: "#" },
        { text: "LinkedIn", url: "#" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} MediCare Store. All rights reserved.`,
  bottomLinks = [
    { text: "Terms & Conditions", url: "/terms" },
    { text: "Privacy Policy", url: "/privacy" },
    { text: "Cookie Policy", url: "/cookies" },
  ],
}: any) => {
  return (
    <section className={cn("py-16 border-t bg-slate-50 dark:bg-slate-950", className)}>
      <div className="container mx-auto px-4">
        <footer>
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-6">
            {/* Branding & Contact Info */}
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2">
                <Link href={logo.url} className="flex items-center gap-2">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-10 w-auto dark:invert object-contain"
                  />
                  <span className="text-2xl font-bold tracking-tight">{logo.title}</span>
                </Link>
              </div>
              <p className="mt-4 text-muted-foreground max-w-xs leading-relaxed text-sm">
                {tagline}
              </p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="size-4 text-primary" />
                  <span>+880 1XXX-XXXXXX (24/7 Support)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="size-4 text-primary" />
                  <span>support@medicare.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="size-4 text-primary" />
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>

            {/* Menu Sections */}
            {menuItems.map((section: any, sectionIdx: number) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-foreground text-sm uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link: any, linkIdx: number) => (
                    <li key={linkIdx} className="hover:text-primary transition-colors">
                      <Link href={link.url}>{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col justify-between gap-6 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>
            
            {/* Payment Icons Placeholder */}
            <div className="flex gap-2 items-center opacity-70 grayscale hover:grayscale-0 transition-all">
                <span className="text-[10px] uppercase font-bold mr-2">Secure Payments:</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                <img src="https://i.ibb.co/3p18r5d/bkash-logo.png" alt="bKash" className="h-6" />
            </div>

            <ul className="flex gap-6">
              {bottomLinks.map((link: any, linkIdx: number) => (
                <li key={linkIdx} className="hover:text-primary transition-colors">
                  <Link href={link.url}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };