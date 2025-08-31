"use client";

import Auth from "@/components/Auth";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const { session } = useAuth();

  return (
    <div className="flex flex-col items-center min-h-screen">
      <NavBar />
      <main className="px-4 py-8 w-full my-auto">{session ? <Dashboard /> : <Auth />}</main>
      <Footer />
      <Toaster />
    </div>
  );
}
