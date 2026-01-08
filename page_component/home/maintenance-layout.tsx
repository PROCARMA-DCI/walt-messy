"use client";

import { ArraySkeleton } from "@/components/loader/SkeletonLoader";
import StripePayment from "@/components/StripePayment/StripePayment";
import { useAppContext } from "@/context/AppProvider";
import { currencyFormatter } from "@/utils/helpers";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
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
  const [thankYou, setThankYou] = useState<Record<string, any> | null>(null);

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

  const serviceImage: Record<string, string> = {
    "OIL & FILTER CHANGES": "/images/services/OIL-CHANGE.png",
    "TIRE ROTATION": "/images/services/TIRE-ROTATION.png",
    "MULTI POINT INSPECTION": "/images/services/MULTIPOINT.png",
    "BRAKE INSPECTION": "/images/services/BRAKE.png",
    "BATTERY PERFORMANCE EVALUATION": "/images/services/BATTERY.png",
  };
  return (
    <div
      className="relative min-h-screen lg:w-[1440px] w-full xl:h-[1319px]  bg-white overflow-hidden flex flex-col items-center xl:block"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {/* Background gradient element - unified with responsive positioning */}
      <div className="absolute xl:h-[1063.729px] h-[670px]  xl:left-[-233.34px] left-auto xl:top-[-423.87px] top-auto xl:w-[1860.536px] w-[3000px]">
        <div className="absolute xl:inset-[-4.7%_-2.69%] inset-[-20.72%_-7.92%]">
          <img
            alt=""
            className="block max-w-none size-full "
            src="/images/maintenance/subtract.svg"
          />
        </div>
      </div>

      {/* Ellipse 3 */}
      <div className="absolute flex items-center justify-center xl:left-[15.31px] xl:size-[634.572px] xl:top-[24.22px] size-[188.665px] top-[26.31px]">
        <div className="flex-none rotate-[180deg]">
          <div className="relative xl:size-[634.572px] size-[200.665px]">
            <img
              alt=""
              className="block max-w-none size-full"
              src="/images/maintenance/ellipse-3.svg"
            />
          </div>
        </div>
      </div>

      {/* Ellipse 4 */}
      <div className="absolute flex items-center justify-center xl:left-[-24.56px] xl:size-[714.314px] xl:top-[-15.65px]  size-[212.373px] top-[14.45px]">
        <div className="flex-none rotate-[180deg]">
          <div className="relative xl:size-[714.314px] size-[230.373px]">
            <div className="absolute inset-[-0.14%]">
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
      <div className="absolute  xl:hidden flex items-center justify-center  size-[231.42px] top-[4.93px]">
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
      <div className="absolute top-[32.19px]  xl:top-none xl:inset-[7.16%_59.73%_55.38%_5.93%] size-[170px] xl:size-[450.314px]">
        <img
          alt="WM Logo"
          className="block xl:hidden max-w-none size-full"
          src="/images/maintenance/vector-mobile.svg"
        />
        <img
          alt="WM Logo"
          className="hidden xl:block max-w-none size-full ml-5 "
          src="/images/maintenance/vector.svg"
        />
      </div>

      {/* Header Text - unified responsive typography */}
      <div className="absolute text-center text-white top-[175px] xl:top-[52px] xl:left-[1039px] xl:translate-x-[-50%] w-full xl:w-[729px]">
        <p className="font-thin italic text-[30px] xl:text-[85px] leading-tight">
          MAINTENANCE
        </p>
        <p className="font-bold italic text-[30px] xl:text-[85px] leading-tight xl:mt-[-20px]">
          MADE EASY
        </p>
      </div>

      {/* Main Card Container - using responsive widths and positioning */}
      <div className="absolute top-[260px] xl:top-[253px] xl:left-[737px] bg-white flex flex-col gap-5 w-[92%] max-w-[500px] xl:w-[602px] xl:max-w-none p-[15px] xl:p-[17.6px] rounded-[20px] xl:rounded-[23px] shadow-lg z-20">
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
                      className="relative flex-1 h-8 xl:h-11"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-xl bg-white shadow-sm"
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
                        src={
                          serviceImage[service.CouponTitle] ||
                          service.ServiceImg ||
                          "/placeholder.svg"
                        }
                        alt={service.CouponTitle}
                        className="object-cover size-20 xl:size-24"
                      />
                      <p className="font-bold text-[#101828] text-[10px] xl:text-[11px] text-center mt-2">
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
                  <span className="text-xl xl:text-2xl text-gray-400 line-through decoration-red-500">
                    {currencyFormatter(totalAmount)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#4a5565]">
                  {totalAmount !== discountAmount
                    ? "Holiday Savings:"
                    : "Normal Price:"}
                </span>
                <span className="text-xl xl:text-2xl font-bold text-[#101828]">
                  {currencyFormatter(discountAmount)}
                </span>
              </div>
            </div>
          </>
        )}
        {/* Purchase Plan */}
        {selectedProduct && (
          <StripePayment
            selectedProduct={selectedProduct}
            openPaymentModal={openPaymentModal}
            setOpenPaymentModal={setOpenPaymentModal}
            setThankYou={setThankYou}
          />
        )}
        {thankYou && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white relative rounded-2xl shadow-xl p-8 w-[90%] max-w-md text-center">
              {/* Success Icon */}
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="size-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-semibold text-gray-900">
                Payment Successful 🎉
              </h2>

              {/* Message */}
              <p className="mt-2 text-gray-600">
                {thankYou?.message || "Thank you for your purchase!"}
              </p>
              {/* Order ID */}
              <div className="mt-4 rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-800">
                <span className="font-medium">Order ID:</span>{" "}
                <span className="font-mono">{thankYou?.order_id}</span>
              </div>
              {/* Contract ID */}
              <div className="mt-4 rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-800">
                <span className="font-medium">Contract #:</span>{" "}
                <span className="font-mono">{thankYou?.ContractNo}</span>
              </div>

              <div className="mt-4 rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-800">
                <span className="font-medium">Password</span>{" "}
                <span className="font-mono">Last 6 Digit of Vin</span>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setThankYou(null);
                  }}
                  className="flex-1 absolute top-4 right-4 rounded-lg   h-6 w-6 text-gray-700 hover:bg-gray-100"
                >
                  <X />
                </button>

                {/* <button
                  onClick={() => {
                    setThankYou(null);
                    // optional: router.push("/")
                  }}
                  className="flex-1 rounded-lg bg-green-600 py-2 text-white hover:bg-green-700"
                >
                  Continue
                </button> */}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer - responsive text and placement */}
      <div className="absolute left-8 xl:left-28 top-[1030px] xl:top-[717px] max-w-[320px] xl:max-w-[493px] pb-10 xl:pb-0">
        <p className="font-bold text-[10px] text-[#4a5565] mb-1">Disclaimer</p>
        <p className="text-[10px] text-[#4a5565] leading-relaxed">
          <span className="xl:hidden">
            Sed non placerat massa, sit amet volutpat neque. Sed hendrerit nisi
            id dolor cursus, nec gravida ex efficitur. Fusce molestie varius
            massa eu condimentum
          </span>
          <span className="hidden xl:inline">
            We’re sorry. The promotional benefit is not available for your
            vehicle at this time.
          </span>
        </p>
      </div>
    </div>
  );
};
export default MaintenanceLayout;
