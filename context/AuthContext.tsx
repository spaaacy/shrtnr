"use client";

import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState, createContext, ReactNode, useContext } from "react";

export const AuthContext = createContext<{ session: Session | null }>({ session: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!session) fetchSession();
  }, [session]);

  const fetchSession = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
  };

  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
