"use client";

import { useAppContext } from "@/context/AppProvider";
import { DesktopLayout } from "@/page_component/home/DesktopLayout";
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
    <div className="min-h-screen w-full md:flex md:items-center md:justify-center bg-gray-100 md:overflow-hidden">
      {/* Desktop Layout (hidden on mobile) */}
      <DesktopLayout
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        products={products}
      />

      {/* Mobile Layout (shown on mobile only) */}
      {/* <MobileLayout
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        products={displayedProducts}
        prices={prices}
      /> */}
    </div>
  );
}
