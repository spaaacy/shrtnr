"use client";

import React, { SetStateAction, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Links } from "./MyLinks";

interface EditIdProps {
  id: string;
  setEditId: React.Dispatch<SetStateAction<string>>;
  setLinks: React.Dispatch<SetStateAction<Links[]>>;
}

const EditId = ({ id, setEditId, setLinks }: EditIdProps) => {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Used to automatically have typewriter on input
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Unselect input upon click away
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setEditId("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSubmit = async () => {
    try {
      if (input === "404") throw Error("ID cannot be 404");
      const response = await fetch(`/api/url/edit`, {
        method: "POST",
        body: JSON.stringify({ id, newId: input }),
      });
      if (response.status !== 200) {
        const result = await response.json();
        throw result.error;
      }
      setEditId("");
      setLinks((links) => links.map((link) => (link.id === id ? { ...link, id: input } : link)));
    } catch (error) {
      console.error(error);
      toast.error("ID is already taken");
    }
  };

  return (
    <input
      ref={inputRef}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSubmit();
      }}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      type="text"
      className="bg-gray-200 text-right w-[8rem] text-gray-600 text-sm px-2 py-1 rounded-full focus:outline-none"
    />
  );
};

export default EditId;
