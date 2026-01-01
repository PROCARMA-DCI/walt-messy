"use client";

import { ArraySkeleton } from "@/components/loader/SkeletonLoader";
import StripePayment from "@/components/StripePayment/StripePayment";
import { useAppContext } from "@/context/AppProvider";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const MaintenanceLayout = ({
  setSelectedTab,
  selectedTab,
  products,
}: {
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  selectedTab: string;
  products: any[];
}) => {
  const { loading } = useAppContext();
  const [selectedProduct, setSelectedProduct] = useState<Record<string, any>>();
  const [services, setServices] = React.useState<any[]>([]);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  useEffect(() => {
    const selectedProduct = products.find(
      (product) => product.product_id === selectedTab
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedProduct(selectedProduct);
    setServices(selectedProduct?.Services ?? []);
  }, [selectedTab, products]);

  const totalAmount =
    Number(selectedProduct?.list_price ?? 0) +
    Number(selectedProduct?.product_saving ?? 0);
  const discountAmount = Number(selectedProduct?.list_price ?? 0);

  return (
    <div
      className="relative min-h-screen lg:w-[1440px] w-full md:h-[1319px] bg-white overflow-hidden flex flex-col items-center md:block"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {/* Background gradient element - unified with responsive positioning */}
      <div className="absolute h-[1063.729px] left-[-233.34px] top-[-423.87px] w-[1860.536px]">
        <div className="absolute inset-[-4.7%_-2.69%]">
          <img
            alt=""
            className="block max-w-none size-full"
            src="/images/maintenance/subtract.svg"
          />
        </div>
      </div>

      {/* Ellipse 3 */}
      <div className="absolute flex items-center justify-center  size-[188.665px] top-[26.31px]">
        <div className="flex-none rotate-[180deg]">
          <div className="relative size-[200.665px]">
            <img
              alt=""
              className="block max-w-none size-full"
              src="/images/maintenance/ellipse-3.svg"
            />
          </div>
        </div>
      </div>

      {/* Ellipse 4 */}
      <div className="absolute flex items-center justify-center  size-[212.373px] top-[14.45px]">
        <div className="flex-none rotate-[180deg]">
          <div className="relative size-[230.373px]">
            <div className="absolute inset-[-0.47%]">
              <img
                alt=""
                className="block max-w-none size-full"
                src="/images/maintenance/ellipse-4.svg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ellipse 5 */}
      <div className="absolute  md:hidden flex items-center justify-center  size-[231.42px] top-[4.93px]">
        <div className="flex-none rotate-[180deg]">
          <div className="relative size-[250.42px]">
            <img
              alt=""
              className="block max-w-none size-full"
              src="/images/maintenance/ellipse-5.svg"
            />
          </div>
        </div>
      </div>

      {/* WM Logo - switches source based on screen size via CSS if possible, or hidden/visible */}
      <div className="absolute top-[47.19px] md:top-auto md:inset-[7.16%_59.73%_55.38%_5.93%] size-[170px] md:size-[450.314px]">
        <img
          alt="WM Logo"
          className="block md:hidden max-w-none size-full"
          src="/images/maintenance/vector-mobile.svg"
        />
        <img
          alt="WM Logo"
          className="hidden md:block max-w-none size-full"
          src="/images/maintenance/vector.svg"
        />
      </div>

      {/* Header Text - unified responsive typography */}
      <div className="absolute text-center text-white top-[175px] md:top-[52px] md:left-[1039px] md:translate-x-[-50%] w-full md:w-[729px]">
        <p className="font-thin italic text-[30px] md:text-[85px] leading-tight">
          MAINTENANCE
        </p>
        <p className="font-bold italic text-[30px] md:text-[85px] leading-tight md:mt-[-20px]">
          MADE EASY
        </p>
      </div>

      {/* Main Card Container - using responsive widths and positioning */}
      <div className="absolute top-[260px] md:top-[253px] md:left-[737px] bg-white flex flex-col gap-5 w-[92%] max-w-[500px] md:w-[602px] md:max-w-none p-[15px] md:p-[17.6px] rounded-[20px] md:rounded-[23px] shadow-lg z-20">
        {!openPaymentModal && (
          <>
            <div className="bg-[#f3f4f6] flex gap-1 p-1 rounded-lg w-full">
              {loading ? (
                <ArraySkeleton />
              ) : (
                products.map((product) => {
                  const isActive = selectedTab === product.product_id;
                  return (
                    <button
                      key={product.product_id}
                      onClick={() => setSelectedTab(product.product_id)}
                      className="relative flex-1 h-8 md:h-11"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-md bg-white shadow-sm"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                      <span
                        className={`relative z-10 text-[11px] font-semibold block text-center ${
                          isActive ? "text-[#101828]" : "text-[#4a5565]"
                        }`}
                      >
                        {product.product_title}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Services Grid */}
            {loading ? (
              <ArraySkeleton className="size-20" />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-3 gap-2"
                >
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border border-gray-200 flex flex-col items-center p-2 rounded-xl"
                    >
                      <img
                        src={service.ServiceImg || "/placeholder.svg"}
                        alt={service.CouponTitle}
                        className="object-cover size-20 md:size-24"
                      />
                      <p className="font-bold text-[#101828] text-[10px] md:text-[11px] text-center mt-2">
                        {service.CouponTitle}
                        <br />
                        <span className="font-normal">{service.subtitle}</span>
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Pricing Section */}
            <div className="space-y-2">
              {totalAmount !== discountAmount && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#4a5565]">Normal Price:</span>
                  <span className="text-xl md:text-2xl text-gray-400 line-through decoration-red-500">
                    ${totalAmount}.00
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#4a5565]">
                  {totalAmount !== discountAmount
                    ? "Holiday Savings:"
                    : "Normal Price:"}
                </span>
                <span className="text-xl md:text-2xl font-bold text-[#101828]">
                  ${discountAmount}.00
                </span>
              </div>
            </div>
          </>
        )}

        {selectedProduct && (
          <StripePayment
            selectedProduct={selectedProduct}
            openPaymentModal={openPaymentModal}
            setOpenPaymentModal={setOpenPaymentModal}
          />
        )}
      </div>

      {/* Disclaimer - responsive text and placement */}
      <div className="absolute left-8 md:left-28 top-[1030px] md:top-[717px] max-w-[320px] md:max-w-[493px] pb-10 md:pb-0">
        <p className="font-bold text-[10px] text-[#4a5565] mb-1">Disclaimer</p>
        <p className="text-[10px] text-[#4a5565] leading-relaxed">
          <span className="md:hidden">
            Sed non placerat massa, sit amet volutpat neque. Sed hendrerit nisi
            id dolor cursus, nec gravida ex efficitur. Fusce molestie varius
            massa eu condimentum
          </span>
          <span className="hidden md:inline">
            We’re sorry. The promotional benefit is not available for your
            vehicle at this time.
          </span>
        </p>
      </div>
    </div>
  );
};
export default MaintenanceLayout;
