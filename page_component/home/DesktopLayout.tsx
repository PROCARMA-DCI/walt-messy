import { ArraySkeleton } from "@/components/loader/SkeletonLoader";
import StripePayment from "@/components/StripePayment/StripePayment";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/context/AppProvider";
import { currencyFormatter } from "@/utils/helpers";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export const DesktopLayout = ({
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
  }, [selectedTab]);

  const totalAmount =
    Number(selectedProduct?.list_price ?? 0) +
    Number(selectedProduct?.product_saving ?? 0);

  const discountAmount = Number(selectedProduct?.list_price ?? 0);

  return (
    <div
      className="hidden md:block relative w-[1440px] h-[1319px] bg-white overflow-hidden"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {/* Background gradient element */}
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
      <div className="absolute flex items-center justify-center left-[15.31px] size-[634.572px] top-[24.22px]">
        <div className="flex-none rotate-[180deg]">
          <div className="relative size-[634.572px]">
            <img
              alt=""
              className="block max-w-none size-full"
              src="/images/maintenance/ellipse-3.svg"
            />
          </div>
        </div>
      </div>

      {/* Ellipse 4 */}
      <div className="absolute flex items-center justify-center left-[-24.56px] size-[714.314px] top-[-15.65px]">
        <div className="flex-none rotate-[180deg]">
          <div className="relative size-[714.314px]">
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

      {/* MAINTENANCE text */}
      <p className="absolute font-thin h-[125.274px] italic leading-[normal] left-[1039px] text-[85px] text-center text-white top-[52.09px] translate-x-[-50%] w-[729.586px] whitespace-pre-wrap">
        MAINTENANCE
      </p>

      {/* MADE EASY text */}
      <p className="absolute font-bold h-[99.291px] italic leading-[normal] left-[1039px] text-[85px] text-center text-white top-[138.69px] translate-x-[-50%] w-[729.586px] whitespace-pre-wrap">
        MADE EASY
      </p>

      {/* WM Logo */}
      <div className="absolute inset-[7.16%_59.73%_55.38%_5.93%] size-[450.314px]">
        <img
          alt="WM Logo"
          className="block max-w-none size-full"
          src="/images/maintenance/vector.svg"
        />
      </div>

      {/* Main Card Container */}

      <div className="absolute bg-white flex flex-col flex-wrap gap-[20px] items-start left-[737.58px] pb-[20px] pt-[17.61px] px-[17.61px] rounded-[23.142px] shadow-[0px_2.935px_4.402px_-0.734px_rgba(0,0,0,0.1),0px_1.467px_2.935px_-1.467px_rgba(0,0,0,0.1)] top-[253.07px] w-[602.837px]">
        {/* Gas/Diesel Toggle */}
        {!openPaymentModal && (
          <>
            <div className="bg-[#f3f4f6] flex flex-wrap gap-[5.87px] items-center border border-input rounded-[7.337px] w-full p-[2.935px]">
              {loading ? (
                <ArraySkeleton className="" />
              ) : (
                products.map((product) => {
                  const isActive = selectedTab === product.product_id;

                  return (
                    <>
                      <button
                        key={product.product_id}
                        onClick={() => setSelectedTab(product.product_id)}
                        className="relative h-[45px] min-w-[120px] flex-1"
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                            className="absolute inset-0 rounded-[5.87px]
                                      bg-white shadow-[0px_0.734px_2.201px_rgba(0,0,0,0.1)]"
                          />
                        )}

                        <p
                          className={`relative z-10 text-[11.74px] font-semibold text-center
      ${isActive ? "text-[#101828]" : "text-[#4a5565]"}`}
                        >
                          {product.product_title}
                        </p>
                      </button>
                    </>
                  );
                })
              )}
            </div>

            {/* Services Grid */}
            {loading ? (
              <ArraySkeleton className="size-[100.544px]" />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-full grid grid-cols-3 gap-[8.805px]"
                >
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="border border-[#e5e7eb] flex flex-col gap-[11.571px]
                                  items-center justify-center p-[5.785px] rounded-[11.571px]
                                  cursor-pointer"
                    >
                      <div className="size-[100.544px]">
                        <img
                          src={service.ServiceImg}
                          alt={service.CouponTitle}
                          className="object-cover size-full"
                        />
                      </div>

                      <p className="font-bold text-[#101828] text-[10.885px] text-center">
                        {service.CouponTitle}
                        <br />
                        {service.subtitle}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
            {/* Normal Price */}
            {totalAmount !== discountAmount && (
              <div className="flex items-center justify-between w-full">
                {loading ? (
                  <Skeleton className="w-[100px] h-[20px]" />
                ) : (
                  <p className="font-normal text-[14px] text-[#4a5565]">
                    Normal Price:
                  </p>
                )}
                {loading ? (
                  <Skeleton className="w-[100px] h-[20px]" />
                ) : (
                  <p className="font-normal text-[28px] text-[#aaafb6] line-through decoration-red-500 decoration-2">
                    {currencyFormatter(totalAmount)}
                  </p>
                )}
              </div>
            )}

            {/* Holiday Savings */}
            <div className="flex items-center justify-between w-full mb-6">
              {loading ? (
                <Skeleton className="w-[100px] h-[20px]" />
              ) : (
                <p className="font-normal text-[14px] text-[#4a5565]">
                  {totalAmount !== discountAmount
                    ? "Holiday Savings:"
                    : "Normal Price:"}
                </p>
              )}
              {loading ? (
                <Skeleton className="w-[100px] h-[20px]" />
              ) : (
                <p className="font-bold text-[28px] text-[#101828]">
                  {currencyFormatter(discountAmount)}
                </p>
              )}
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

      {/* Disclaimer */}
      <div className="absolute left-[113.71px] top-[717.84px]">
        <p className="font-bold leading-[15.219px] text-[#4a5565] text-[10.146px] mb-2">
          Disclaimer
        </p>
        <p className="font-normal leading-[15.219px] text-[#4a5565] text-[10.146px] w-[493.262px]">
          We’re sorry. The promotional benefit is not available for your vehicle
          at this time.
        </p>
      </div>
    </div>
  );
};
