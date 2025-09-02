"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function NotFound() {
  const searchParams = useSearchParams()

  useEffect(()=>{
    if (searchParams.has("limit")) toast.error("Too many requests")
  },[])
  
  return (
    <div className="flex flex-col items-center min-h-screen">
      <NavBar showMyLinks={null} setShowMyLinks={null} />
      <h1 className=" text-3xl font-semibold">Error 404</h1>
      <p className="text-lg font-light">Page not found</p>
      <Footer />
      <Toaster />
    </div>
  );
}
