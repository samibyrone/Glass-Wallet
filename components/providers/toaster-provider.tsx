"use client";

import dynamic from "next/dynamic";

const Toaster = dynamic(() => import("../ui/toaster"), { ssr: false });

export function ToasterProvider() {
  return <Toaster />;
}
