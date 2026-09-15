import type { Metadata } from "next";
import Shell from "@/components/shell";

export const metadata: Metadata = { title: "T2B Command" };

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
