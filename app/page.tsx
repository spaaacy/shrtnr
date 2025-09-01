"use client";

import Auth from "@/components/Auth";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";
import MyLinks from "@/components/MyLinks";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const { session } = useAuth();
  const [showMyLinks, setShowMyLinks] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <NavBar showMyLinks={showMyLinks} setShowMyLinks={setShowMyLinks} />
      <main className="px-4 py-8 w-full">{session ? showMyLinks ? <MyLinks /> : <Dashboard /> : <Auth />}</main>
      <Footer />
      <Toaster />
    </div>
  );
}
