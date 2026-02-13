"use client";
import { usePathname } from "next/navigation";
import { Footer2 } from "@/components/layout/footer2";
import React from "react";
import { Navbar1 } from "@/components/layout/navbar1";
import { Category } from "@/types/medi.service";

interface WrapperProps {
  children: React.ReactNode;
  initialCategories: Category[];
}

export function LayoutWrapper({ children, initialCategories }: WrapperProps) {
  const pathname = usePathname();
  const hideLayoutPages = ["/login", "/signup"];
  const hideLayout = hideLayoutPages.includes(pathname);

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar1 initialCategories={initialCategories} />
      {children}
      <Footer2 />
    </>
  );
}