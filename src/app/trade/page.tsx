"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Trade() {
  const router = useRouter();

  useEffect(() => {
    router.push("/trade/BTC");
  }, []);
  return <div>page</div>;
}
