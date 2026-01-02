// @ts-nocheck
import { ArraySkeleton } from "@/components/loader/SkeletonLoader";
import StripePayment from "@/components/StripePayment/StripePayment";
import { useAppContext } from "@/context/AppProvider";
import { currencyFormatter } from "@/utils/helpers";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
export const MobileLayout = ({
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
      className="md:hidden relative w-full mx-auto bg-white pb-20 flex justify-center items-center "
      style={{ fontFamily: "var(--font-inter) " }}
    >
      {/* Background gradient element */}
      <div className="absolute h-[670px]   w-full overflow-hidden ">
        <div className="absolute inset-[-10.72%_-7.92%]">
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
      <div className="absolute flex items-center justify-center  size-[231.42px] top-[4.93px]">
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

      {/* White circle background with gradient for logo */}
      <div className="absolute  top-[47.19px] w-[170.02px] h-[171.90px] rounded-full "></div>

      {/* WM Logo */}
      <div className="absolute  top-[47.19px] w-[170.02px] h-[171.90px]">
        <img
          alt=""
          className="block max-w-none size-full"
          src="/images/maintenance/vector-mobile.svg"
        />
      </div>

      {/* MAINTENANCE text */}
      <p className="absolute font-thin italic leading-[normal] text-[30px] text-center text-white top-[175.67px]   w-full whitespace-pre-wrap h-[55.618px]">
        MAINTENANCE
      </p>

      {/* MADE EASY text */}
      <p className="absolute font-bold italic leading-[normal] text-[30px] text-center text-white top-[205.58px] w-full whitespace-pre-wrap h-[55.618px]">
        MADE EASY
      </p>

      {/* Main Card Container */}
      <div className="absolute top-[260.78px] bg-white flex flex-col gap-[22px] w-full pb-[15px] pt-[15.22px] px-[15.22px] max-w-[500px] rounded-[20px] shadow-[0px_2.537px_3.805px_-0.634px_rgba(0,0,0,0.1),0px_1.268px_2.537px_-1.268px_rgba(0,0,0,0.1)] ">
        {/* Gas/Diesel Toggle */}
        {!openPaymentModal && (
          <>
            <div className="bg-[#f3f4f6] flex gap-[5.073px] h-[30.438px] p-[2.537px] rounded-[6.341px] w-full relative">
              {loading ? (
                <ArraySkeleton />
              ) : (
                products.map((product) => {
                  const isActive = selectedTab === product.product_id;

                  return (
                    <button
                      key={product.product_id}
                      onClick={() => setSelectedTab(product.product_id)}
                      className="relative flex-1 h-[25.365px] rounded-[5.87px]"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-[5.87px] bg-white
                shadow-[0px_0.734px_2.201px_rgba(0,0,0,0.1)]"
                          transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 30,
                          }}
                        />
                      )}

                      <span
                        className={`relative z-10 text-[11.74px] font-semibold block text-center
              ${isActive ? "text-[#101828]" : "text-[#4a5565]"}`}
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
              <ArraySkeleton className="size-[86.9px]" />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="w-full grid grid-cols-3 gap-[8.805px]"
                >
                  {services.map((service, index) => (
                    <motion.div
                      key={service.CouponTitle}
                      whileTap={{ scale: 0.96 }}
                      whileHover={{ scale: 1.04 }}
                      className="border border-[#e5e7eb] flex flex-col items-center
          p-[5px] rounded-[10px]"
                    >
                      <div className="size-[86.9px]">
                        <img
                          src={service.ServiceImg}
                          alt={service.CouponTitle}
                          className="object-cover size-full"
                        />
                      </div>

                      <p className="font-bold text-[#101828] text-[12px] text-center">
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
                <p className="font-normal text-[10.146px] text-[#4a5565] leading-[15.219px]">
                  Normal Price:
                </p>
                <p className="font-normal text-[20.292px] text-[#aaafb6] leading-[15.219px] line-through decoration-red-500 decoration-2">
                  {currencyFormatter(totalAmount)}
                </p>
              </div>
            )}
            {/* Holiday Savings */}
            <div className="flex items-center justify-between w-full">
              <p className="font-normal text-[10.146px] text-[#4a5565] leading-[15.219px]">
                {totalAmount !== discountAmount
                  ? "Holiday Savings:"
                  : "Normal Price:"}
              </p>
              <p className="font-bold text-[20.292px] text-[#101828] leading-[15.219px]">
                {currencyFormatter(discountAmount)}
              </p>
            </div>
          </>
        )}
        {/* Purchase Plan Button - Inside card for mobile */}

        {selectedProduct && (
          <StripePayment
            selectedProduct={selectedProduct}
            openPaymentModal={openPaymentModal}
            setOpenPaymentModal={setOpenPaymentModal}
          />
        )}
      </div>

      {/* Disclaimer */}
      <div className="absolute left-[35.32px] top-[1029.08px] w-[320.75px] ">
        <p className="font-bold text-[0.8em] text-[#4a5565] leading-[15.219px] mb-2">
          Disclaimer
        </p>
        <p className="font-normal text-[0.8em] text-[#4a5565] leading-[15.219px] pb-10">
          Sed non placerat massa, sit amet volutpat neque. Sed hendrerit nisi id
          dolor cursus, nec gravida ex efficitur. Fusce molestie varius massa eu
          condimentum
        </p>
      </div>
    </div>
  );
};
