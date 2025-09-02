import { supabase } from "@/utils/supabase";
import Image from "next/image";

const Auth = () => {
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <h3 className="text-neutral-300 font-medium">Sign in to Get Started</h3>
      <button
        onClick={signInWithGoogle}
        type="button"
        className="text-gray-700 cursor-pointer gap-2 flex items-center justify-center font-bold py-3 px-6 bg-gray-200 rounded-full mx-auto"
      >
        <div className="h-6 w-6 relative">
          <Image src={"/google.svg"} alt="google" fill={true} />
        </div>
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default Auth;
