import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import React, { SetStateAction } from "react";

const NavBar = ({
  showMyLinks,
  setShowMyLinks,
}: {
  showMyLinks: boolean | null;
  setShowMyLinks: React.Dispatch<SetStateAction<boolean>> | null;
}) => {
  const { session } = useAuth();

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="flex gap-2 items-center justify-start w-full max-w-[1440px] px-10 py-8 mx-auto">
      <div className="flex flex-col items-start justify-center">
        <p className="font-bold text-5xl text-[#f1c40f] max-lg:text-3xl">Shrtnr</p>
        <p className="font-extralight text-gray-200 max-lg:text-xs">Links made easy</p>
      </div>

      {session && (
        <div className="flex items-center ml-auto gap-2">
          {setShowMyLinks && (
            <button
              type="button"
              onClick={() => {
                setShowMyLinks(showMyLinks ? false : true);
              }}
              className="cursor-pointer ml-auto bg-white text-black font-medium px-4 py-2 text-sm  rounded-full"
            >
              {showMyLinks ? "Go Back" : "My Links"}
            </button>
          )}
          <button
            type="button"
            onClick={signOut}
            className="cursor-pointer bg-red-500 text-white font-medium px-4 py-2 rounded-full text-sm  hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
