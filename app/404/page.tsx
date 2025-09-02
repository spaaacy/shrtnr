import NotFound from "@/components/NotFound";
import { Suspense } from "react";

export default function Page() {

  return (
    <Suspense>
      <NotFound />
    </Suspense>
  );
}
