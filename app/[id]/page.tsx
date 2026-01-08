"use client";

import { AppProvider } from "@/context/AppProvider";
import HomeContent from "@/page_component/home/HomeContent";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <AppProvider id={id}>
      <HomeContent />
    </AppProvider>
  );
}
