"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type AppContextType = {
  token: string | null;
  products: Record<string, any>[];
  loading: boolean;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [products, setProducts] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch(
      "https://mypcp.us/webservices/product/productlist/be8b362432bf91371acb831c343252de4bcd70d390759a9f14bc3ae6b1dc10220bc371772c1c1c9875476216acb553abca8315746b2724536e8029f692a1ad100KDBkemdTE4Of5sOjff7iJjsil28h2tM"
    );
    const data = await res.json();
    setProducts(data.products);
    setToken(data.token);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);
  return (
    <AppContext.Provider
      value={{
        token,
        products,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
};
