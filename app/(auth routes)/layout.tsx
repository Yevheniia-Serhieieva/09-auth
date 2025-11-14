"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

type Props = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      try {
        router.refresh();
      } catch (err) {
        console.error("Failed to refresh router:", err);
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, [router]);

  return <>{loading ? <Loading /> : children}</>;
}
