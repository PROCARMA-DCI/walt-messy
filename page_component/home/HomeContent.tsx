"use client";

import { useAppContext } from "@/context/AppProvider";
import MaintenanceLayout from "@/page_component/home/maintenance-layout";
import { useEffect, useState } from "react";

export default function HomeContent() {
  const { products } = useAppContext();

  const [selectedTab, setSelectedTab] = useState<string>("");

  useEffect(() => {
    if (!selectedTab && products?.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedTab(products[0].product_id);
    }
  }, [products, selectedTab]);

  return (
    <div className="min-h-screen w-full md:flex md:items-center mx-auto md:justify-center bg-gray-100 md:overflow-hidden">
      <MaintenanceLayout
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        products={products}
      />
    </div>
  );
}
