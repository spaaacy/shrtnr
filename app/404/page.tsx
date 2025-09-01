"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <NavBar showMyLinks={null} setShowMyLinks={null} />
      <h1 className="text-gray-600 text-3xl font-semibold">Error 404</h1>
      <p className="text-gray-600 text-lg font-light">Page not found</p>
      <Footer />
      <Toaster />
    </div>
  );
}
