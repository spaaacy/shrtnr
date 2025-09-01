"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Links {
  url: string;
  id: string;
}

const MyLinks = () => {
  const { session } = useAuth();

  const [links, setLinks] = useState<Array<Links>>([]);

  useEffect(() => {
    if (session) fetchLinks();
  }, [session]);

  const fetchLinks = async () => {
    try {
      const userId = session?.user.id;
      const response = await fetch(`/api/url/${userId}`, {
        method: "GET",
      });
      const result = await response.json();
      if (response.status === 200) {
        setLinks(result.links);
      } else {
        throw result.error;
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops, something went wrong...");
    }
  };

  if (links)
    return (
      <div className="flex flex-col px-10 max-w-[1440px] w-full mx-auto">
        <h3 className="text-2xl font-semibold">All Links</h3>
        {links.map((l, i) => {
          return (
            <div key={i} className="flex gap-2 items-center">
              <Link target="_blank" href={l.url} className="text-xl text-blue-500 hover:text-blue-600 hover:underline">
                {l.url}
              </Link>
              <p className="bg-gray-300 text-gray-600 text-sm px-2 py-1 rounded-lg">
                <span className="font-bold">ID:</span> {l.id}
              </p>
            </div>
          );
        })}
      </div>
    );
};

export default MyLinks;
