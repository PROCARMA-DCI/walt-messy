"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
  const services = [
    {
      CouponTitle: "OIL & FILTER CHANGES",
      CouponValue: "50",
      CouponServiceCount: "4",
      ServiceImg: "/images/services/OIL-CHANGE.png",
    },
    {
      CouponTitle: "TIRE ROTATION",
      CouponValue: "10",
      CouponServiceCount: "4",
      ServiceImg: "/images/services/TIRE-ROTATION.png",
    },
    {
      CouponTitle: "MULTI POINT INSPECTION",
      CouponValue: "0",
      CouponServiceCount: "3",
      ServiceImg: "/images/services/MULTIPOINT.png",
    },
    {
      CouponTitle: "BRAKE INSPECTION",
      CouponValue: "10",
      CouponServiceCount: "2",
      ServiceImg: "/images/services/BRAKE.png",
    },
    {
      CouponTitle: "BATTERY PERFORMANCE EVALUATION",
      CouponValue: "0",
      CouponServiceCount: "2",
      ServiceImg: "/images/services/BATTERY.png",
    },
    {
      CouponTitle: "10% OFF ANY ADDITIONAL SERVICES",
      CouponValue: "0",
      CouponServiceCount: "1",
      ServiceImg: "https://mypcp.us/android/car-wash-icon.png",
    },
  ];
  return (
    <div className="min-h-screen w-full md:flex md:items-center mx-auto md:justify-center bg-gray-100 md:overflow-hidden">
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
        <div className="absolute top-[260px] xl:top-[253px] xl:left-[737px] bg-white flex flex-col gap-5 w-[92%] max-w-[500px] xl:w-[602px] xl:max-w-none p-[15px] xl:p-[17.6px] rounded-[20px] xl:rounded-[23px] shadow-lg z-20">
          <AnimatePresence mode="wait">
            <motion.div
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
                    className="object-cover size-20 xl:size-24"
                  />
                  <p className="font-bold text-[#101828] text-[10px] xl:text-[11px] text-center mt-2">
                    {service.CouponTitle}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          <p className="w-full p-4 bg-gray-100 text-black/50 text-center select-none">
            Contract# Required
          </p>
        </div>
      </div>
    </div>
  );
}
