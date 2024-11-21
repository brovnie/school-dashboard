import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lama Dev School Management Dashboard",
  description: "Next.js School Management System",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 <div className="h-screen flex">
  <div className="w-1/6 md:w-[8%] lg:w-[16%] xl:w-[14%]">l</div>
  <div className="w-5/6 md:w-[92%] lg:w-[84%] xl:w-[86%]">r</div>
  </div>
  );
}