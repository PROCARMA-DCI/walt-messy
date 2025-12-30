import React from "react";

export const MobileLayout = ({
  setSelectedTab,
  selectedTab,
  products,
  prices,
}: {
  setSelectedTab: React.Dispatch<React.SetStateAction<"standard" | "diesel">>;
  selectedTab: string;
  products: any[];
  prices: any;
}) => {
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
                selectedTab === "standard" ? "text-[#101828]" : "text-[#4a5565]"
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
          {products.map((product) => (
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
          Sed non placerat massa, sit amet volutpat neque. Sed hendrerit nisi id
          dolor cursus, nec gravida ex efficitur. Fusce molestie varius massa eu
          condimentum
        </p>
      </div>
    </div>
  );
};
