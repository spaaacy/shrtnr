"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EditId from "./EditId";
import { FaClipboard } from "react-icons/fa";

export interface Links {
  link: string;
  id: string;
  total_visit: number;
}

const MyLinks = () => {
  const { session } = useAuth();

  const [links, setLinks] = useState<Array<Links>>([]);
  const [editId, setEditId] = useState<string>("");

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

  return (
    <div className="flex flex-col gap-2 px-10 max-w-[1280px] w-full mx-auto">
      <div className="flex items-center">
        <h3 className="text-2xl font-semibold">All Links</h3>
        <p className="ml-auto font-semibold">Visits</p>
      </div>
      {links.length > 0 ? (
        <>
          {links
            .sort((a, b) => b.total_visit - a.total_visit)
            .map((l, i) => {
              const redirect = `${process.env.NEXT_PUBLIC_APP_URL}/${l.id}`
              
              return (
                <div key={i} className="flex gap-2 items-center">
                  <Link
                    target="_blank"
                    href={redirect}
                    className="text-lg max-lg:text-base text-blue-400 hover:text-blue-500 break-all truncate"
                  >
                    {l.link}
                  </Link>
                  <button
                    type="button"
                    className="text-gray-300 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(redirect)
                        .then(() => {
                          toast.success("URL copied to clipboard!");
                        })
                        .catch((error) => {
                          console.error("Failed to copy: ", error);
                          toast.error("Failed to copy URL.");
                        });
                    }}
                  >
                    <FaClipboard size={20} />
                  </button>
                  <div className="flex items-center ml-auto flex-shrink-0">
                    {editId === l.id ? (
                      <EditId id={l.id} setEditId={setEditId} setLinks={setLinks} />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditId(l.id)}
                        className="cursor-pointer bg-gray-200 flex-shrink-0 text-gray-600 text-sm px-3 py-1 rounded-full"
                      >
                        {l.id}
                      </button>
                    )}
                    <p className="w-12 text-right">{l.total_visit}</p>
                  </div>
                </div>
              );
            })}
        </>
      ) : (
        <p>No links found</p>
      )}
    </div>
  );
};

export default MyLinks;
