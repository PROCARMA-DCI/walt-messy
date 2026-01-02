"use client";

import { useAppContext } from "@/context/AppProvider";
import MaintenanceLayout from "@/page_component/home/maintenance-layout";
import { useEffect, useState } from "react";

export default function Home() {
  const { products } = useAppContext();
  const [selectedTab, setSelectedTab] = useState<string>(
    products[0]?.product_id ?? ""
  );
  useEffect(() => {
    if (!selectedTab && products?.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedTab(products[0].product_id);
    }
  }, [products, selectedTab]);

  return (
    <div className="min-h-screen w-full md:flex md:items-center mx-auto md:justify-center bg-gray-100 md:overflow-hidden">
      {/* Desktop Layout (hidden on mobile) */}
      <MaintenanceLayout
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        products={products}
      />
      {/* <DesktopLayout
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        products={products}
      /> */}

      {/* Mobile Layout (shown on mobile only) */}
      {/* <MobileLayout
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        products={products}
      /> */}
    </div>
  );
}
