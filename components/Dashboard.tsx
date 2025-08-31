import { useAuth } from "@/context/AuthContext";
import generateId from "@/utils/generateId";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [urlInput, setUrlInput] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");

  const { session } = useAuth();

  const generateUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlId = generateId();
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/${urlId}`;

    try {
      const response = await fetch("/api/url/create", {
        method: "POST",
        body: JSON.stringify({ userId: session?.user.id, id: urlId, url: urlInput }),
      });
      if (response.status !== 201) {
        const { error } = await response.json();
        throw error;
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops, something went wrong...");
    }

    setShortenedUrl(url);
    console.log(session);
  };

  return (
    <div className="relative flex flex-col mx-auto w-full max-w-[38rem]">
      <form onSubmit={generateUrl} className="flex flex-col w-full">
        <label htmlFor="url" className="mb-1 font-bold">
          URL
        </label>
        <div className="flex items-center gap-2 w-full">
          <input
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
            }}
            id="url"
            type="url"
            className="border-2 border-fuchsia-600 rounded-lg w-full p-2 focus:outline-none "
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white font-semibold px-4 py-2 rounded"
          >
            Go
          </button>
        </div>
      </form>
      {shortenedUrl && (
        <div className="absolute -bottom-8">
          <Link target="_blank" href={shortenedUrl} className="text-blue-500 hover:text-blue-600 hover:underline">
            {shortenedUrl}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
