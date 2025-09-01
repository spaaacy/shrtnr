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
      <Link href={"/"} className="flex flex-col items-start justify-center">
        <p className="font-bold text-5xl text-blue-700">Shrtnr</p>
        <p className="font-extralight text-gray-500">Links made easy</p>
      </Link>

      {session && (
        <div className="flex items-center ml-auto gap-2">
          {setShowMyLinks && (
            <button
              type="button"
              onClick={() => {
                setShowMyLinks(showMyLinks ? false : true);
              }}
              className="hover:cursor-pointer ml-auto bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {showMyLinks ? "Go Back" : "My Links"}
            </button>
          )}
          <button
            type="button"
            onClick={signOut}
            className="hover:cursor-pointer bg-red-500 text-white font-medium px-4 py-2 rounded-md hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
