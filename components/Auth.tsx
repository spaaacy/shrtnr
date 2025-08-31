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
    <button
      onClick={signInWithGoogle}
      type="button"
      className="hover:cursor-pointer gap-2 flex items-center justify-center font-bold py-4 px-6 bg-gray-200 rounded-full"
    >
      <div className="h-6 w-6 relative">
        <Image src={"/google.svg"} alt="google" fill={true} />
      </div>
      <span>Continue with Google</span>
    </button>
  );
};

export default Auth;
