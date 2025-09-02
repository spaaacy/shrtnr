import { useAuth } from "@/context/AuthContext";
import generateId from "@/utils/generateId";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaClipboard } from "react-icons/fa";

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
      setUrlInput("")
      toast.success("URL generatad successfully!")
    } catch (error) {
      console.error(error);
      toast.error("Oops, something went wrong...");
    }

    setShortenedUrl(url);
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
            className="border-2 bg-white border-gray-600 rounded-l-full w-full p-2 focus:outline-none "
          />
          <button
            type="submit"
            className="bg-[#f1c40f] hover:bg-[#f1c40f] hover:cursor-pointer text-shadow-2xs text-shadow-black font-semibold px-6 py-2 rounded-r-full"
          >
            Go
          </button>
        </div>
      </form>
      {shortenedUrl && (
        <div className="absolute -bottom-12">
          <div className="flex gap-2 items-center">
            <Link target="_blank" href={shortenedUrl} className="bg-gray-300 text-gray-600 px-2 py-1 rounded-lg hover:underline">
              {shortenedUrl}
            </Link>
            <button
              type="button"
              className="text-gray-300 cursor-pointer"
              onClick={() => {
                navigator.clipboard
                  .writeText(shortenedUrl)
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
