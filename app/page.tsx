"use client";

import { useState } from "react";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<"standard" | "diesel">(
    "standard"
  );

  const prices = {
    standard: {
      normal: "$365.99",
      holiday: "$235.00",
    },
    diesel: {
      normal: "$299.99",
      holiday: "$189.00",
    },
  };

  const products = [
    {
      id: 1,
      name: "Oil Change",
      subtitle: "+ Oil Filter Changes",
      image: "/images/maintenance/oil-change-1.png",
    },
    {
      id: 2,
      name: "Tire",
      subtitle: "Rotations",
      image: "/images/maintenance/oil-change-3.png",
    },
    {
      id: 3,
      name: "Multi-Point",
      subtitle: "Inspections",
      image: "/images/maintenance/oil-change-6.png",
    },
    {
      id: 4,
      name: "Brake",
      subtitle: "Inspections",
      image: "/images/maintenance/oil-change-2.png",
    },
    {
      id: 5,
      name: "Battery",
      subtitle: "Performance Checks",
      image: "/images/maintenance/oil-change-4.png",
    },
    {
      id: 6,
      name: "Exclusive",
      subtitle: "Offers",
      image: "/images/maintenance/oil-change-5.png",
    },
  ];

  const displayedProducts =
    selectedTab === "diesel" ? products.slice(0, 3) : products;

  return (
    <div className="min-h-screen w-full md:flex md:items-center md:justify-center bg-gray-100 md:overflow-hidden">
      {/* Desktop Layout (hidden on mobile) */}
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
        <div className="absolute inset-[7.16%_59.73%_55.38%_5.93%]">
          <img
            alt="WM Logo"
            className="block max-w-none size-full"
            src="/images/maintenance/vector.svg"
          />
        </div>

        {/* Main Card Container */}
        <div className="absolute bg-white flex flex-col gap-[20px] items-start left-[737.58px] pb-[20px] pt-[17.61px] px-[17.61px] rounded-[23.142px] shadow-[0px_2.935px_4.402px_-0.734px_rgba(0,0,0,0.1),0px_1.467px_2.935px_-1.467px_rgba(0,0,0,0.1)] top-[253.07px] w-[602.837px]">
          {/* Gas/Diesel Toggle */}
          <div className="bg-[#f3f4f6] flex gap-[5.87px] h-[35.22px] items-start pb-0 pt-[2.935px] px-[2.935px] relative rounded-[7.337px] shrink-0 w-full">
            <button
              onClick={() => setSelectedTab("standard")}
              className={`flex-[1_0_0] h-[29.35px] relative rounded-[5.87px] shrink-0 transition-all ${
                selectedTab === "standard"
                  ? "bg-white shadow-[0px_0.734px_2.201px_0px_rgba(0,0,0,0.1),0px_0.734px_1.467px_-0.734px_rgba(0,0,0,0.1)]"
                  : "bg-transparent hover:bg-white/50"
              }`}
            >
              <p
                className={`absolute font-bold leading-[17.61px] left-1/2 text-[11.74px] text-center top-[5.42px] -translate-x-1/2 ${
                  selectedTab === "standard"
                    ? "text-[#101828]"
                    : "text-[#4a5565]"
                }`}
              >
                Standard Gas
              </p>
            </button>
            <button
              onClick={() => setSelectedTab("diesel")}
              className={`flex-[1_0_0] h-[29.35px] relative rounded-[5.87px] shrink-0 transition-all ${
                selectedTab === "diesel"
                  ? "bg-white shadow-[0px_0.734px_2.201px_0px_rgba(0,0,0,0.1),0px_0.734px_1.467px_-0.734px_rgba(0,0,0,0.1)]"
                  : "bg-transparent hover:bg-white/50"
              }`}
            >
              <p
                className={`absolute font-normal leading-[17.61px] left-1/2 text-[11.74px] text-center top-[5.42px] -translate-x-1/2 ${
                  selectedTab === "diesel" ? "text-[#101828]" : "text-[#4a5565]"
                }`}
              >
                Diesel
              </p>
            </button>
          </div>

          {/* Services Grid */}
          <div
            className="relative w-full"
            style={{
              height: selectedTab === "diesel" ? "193.94px" : "378.364px",
            }}
          >
            <div className="relative w-full grid grid-cols-3 gap-x-[8.805px] gap-y-[8.805px]">
              {displayedProducts.map((product, index) => {
                const row = Math.floor(index / 3);
                const col = index % 3;

                return (
                  <div
                    key={product.id}
                    className="border-[#e5e7eb] border-[1.157px] border-solid flex flex-col gap-[11.571px] items-center justify-center p-[5.785px] rounded-[11.571px] size-[185.132px] transition-all duration-200 hover:shadow-lg hover:scale-105 hover:border-gray-300 cursor-pointer"
                    style={{
                      position: "absolute",
                      left:
                        col === 0
                          ? "0"
                          : col === 1
                          ? "calc(50% - 92.566px)"
                          : "calc(100% - 185.132px)",
                      top: `${row * 193.94}px`,
                    }}
                  >
                    <div className="relative size-[100.544px]">
                      <img
                        alt={product.name}
                        className="absolute inset-0 max-w-none object-cover size-full"
                        src={product.image}
                      />
                    </div>
                    <p className="font-bold leading-[18.513px] text-[#101828] text-[13.885px] text-center w-full whitespace-pre-wrap">
                      {product.name}
                      <br />
                      {product.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Normal Price */}
          <div className="flex items-center justify-between w-full">
            <p className="font-normal text-[14px] text-[#4a5565]">
              Normal Price:
            </p>
            <p className="font-normal text-[28px] text-[#aaafb6] line-through decoration-red-500 decoration-2">
              {prices[selectedTab].normal}
            </p>
          </div>

          {/* Holiday Savings */}
          <div className="flex items-center justify-between w-full mb-6">
            <p className="font-normal text-[14px] text-[#4a5565]">
              Holiday Savings:
            </p>
            <p className="font-bold text-[28px] text-[#101828]">
              {prices[selectedTab].holiday}
            </p>
          </div>
        </div>

        {/* Purchase Plan Button - Outside the card (Desktop only) */}
        <div
          className="absolute left-[737.58px] w-[602.837px] bg-[#1f25cb] h-[47.44px] rounded-[10.414px] cursor-pointer hover:bg-[#1a20a8] transition-colors shadow-lg"
          style={{ top: selectedTab === "diesel" ? "710px" : "880px" }}
        >
          <p className="absolute font-bold leading-[32.398px] left-1/2 text-[16.199px] text-center text-white top-[7.52px] -translate-x-1/2">
            Purchase Plan
          </p>
        </div>

        {/* Disclaimer */}
        <div className="absolute left-[113.71px] top-[717.84px]">
          <p className="font-bold leading-[15.219px] text-[#4a5565] text-[10.146px] mb-2">
            Disclaimer
          </p>
          <p className="font-normal leading-[15.219px] text-[#4a5565] text-[10.146px] w-[493.262px]">
            We’re sorry. The promotional benefit is not available for your
            vehicle at this time.
          </p>
        </div>
      </div>

      {/* Mobile Layout (shown on mobile only) */}
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
          <div className="bg-[#f3f4f6] flex gap-[5.073px] h-[30.438px] pb-0 pt-[2.537px] px-[2.537px] rounded-[6.341px] w-full">
            <button
              onClick={() => setSelectedTab("standard")}
              className={`flex-1 h-[25.365px] rounded-[5.073px] transition-all ${
                selectedTab === "standard"
                  ? "bg-white shadow-[0px_0.634px_1.902px_0px_rgba(0,0,0,0.1),0px_0.634px_1.268px_-0.634px_rgba(0,0,0,0.1)]"
                  : "bg-transparent"
              }`}
            >
              <p
                className={`font-bold text-[10.146px] text-center leading-[15.219px] ${
                  selectedTab === "standard"
                    ? "text-[#101828]"
                    : "text-[#4a5565]"
                }`}
              >
                Standard Gas
              </p>
            </button>
            <button
              onClick={() => setSelectedTab("diesel")}
              className={`flex-1 h-[25.365px] rounded-[5.073px] transition-all ${
                selectedTab === "diesel"
                  ? "bg-white shadow-[0px_0.634px_1.902px_0px_rgba(0,0,0,0.1),0px_0.634px_1.268px_-0.634px_rgba(0,0,0,0.1)]"
                  : "bg-transparent"
              }`}
            >
              <p
                className={`font-normal text-[10.146px] text-center leading-[15.219px] ${
                  selectedTab === "diesel" ? "text-[#101828]" : "text-[#4a5565]"
                }`}
              >
                Diesel
              </p>
            </button>
          </div>

          {/* Services Grid - 2 columns for mobile */}
          <div className="grid grid-cols-2 gap-[7.61px] w-full">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="border border-[#e5e7eb] border-solid flex flex-col items-center p-[5px] rounded-[10px]  transition-all duration-200 active:scale-95"
              >
                <div className="relative size-[86.9px] mt-2">
                  <img
                    alt={product.name}
                    className="absolute inset-0 max-w-none object-cover size-full"
                    src={product.image}
                  />
                </div>
                <p className="font-bold text-[12px] leading-[16px] text-[#101828] text-center w-[141px] mt-auto whitespace-pre-wrap">
                  {product.name}
                  <br />
                  {product.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Normal Price */}
          <div className="flex items-center justify-between w-full">
            <p className="font-normal text-[10.146px] text-[#4a5565] leading-[15.219px]">
              Normal Price:
            </p>
            <p className="font-normal text-[20.292px] text-[#aaafb6] leading-[15.219px] line-through decoration-red-500 decoration-2">
              {prices[selectedTab].normal}
            </p>
          </div>

          {/* Holiday Savings */}
          <div className="flex items-center justify-between w-full">
            <p className="font-normal text-[10.146px] text-[#4a5565] leading-[15.219px]">
              Holiday Savings:
            </p>
            <p className="font-bold text-[20.292px] text-[#101828] leading-[15.219px]">
              {prices[selectedTab].holiday}
            </p>
          </div>

          {/* Purchase Plan Button - Inside card for mobile */}
          <button className="bg-[#1f25cb] h-[41px] w-full rounded-[9px] hover:bg-[#1a20a8] transition-colors">
            <p className="font-bold text-[14px] text-center text-white leading-[28px]">
              Purchase Plan
            </p>
          </button>
        </div>

        {/* Disclaimer */}
        <div className="absolute left-[35.32px] top-[1029.08px] w-[320.75px] ">
          <p className="font-bold text-[0.8em] text-[#4a5565] leading-[15.219px] mb-2">
            Disclaimer
          </p>
          <p className="font-normal text-[0.8em] text-[#4a5565] leading-[15.219px] pb-10">
            Sed non placerat massa, sit amet volutpat neque. Sed hendrerit nisi
            id dolor cursus, nec gravida ex efficitur. Fusce molestie varius
            massa eu condimentum
          </p>
        </div>
      </div>
    </div>
  );
}
