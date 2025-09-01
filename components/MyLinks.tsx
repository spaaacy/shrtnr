"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EditId from "./EditId";

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
        // setLinks(result.links);
      } else {
        throw result.error;
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops, something went wrong...");
    }
  };

  return (
    <div className="flex flex-col gap-2 px-10 max-w-[1440px] w-full mx-auto">
      <div className="flex items-center">
        <h3 className="text-2xl font-semibold">All Links</h3>
        <p className="ml-auto font-semibold">Visits</p>
      </div>
      {links.length > 0 ? (
        <>
          {links.map((l, i) => {
            return (
              <div key={i} className="flex gap-2 items-center">
                <Link
                  target="_blank"
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/${l.id}`}
                  className="text-xl text-blue-500 hover:text-blue-600 hover:underline"
                >
                  {l.link}
                </Link>
                <div className="flex items-center ml-auto">
                  {editId === l.id ? (
                    <EditId id={l.id} setEditId={setEditId} setLinks={setLinks} />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditId(l.id)}
                      className="cursor-pointer bg-gray-300 text-gray-600 text-sm px-2 py-1 rounded-lg"
                    >
                      <span className="font-bold">ID:</span> {l.id}
                    </button>
                  )}
                  <p className="w-10 text-right">{l.total_visit}</p>
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
