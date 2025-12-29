import Image from "next/image";

export default function MaintenancePage() {
  return (
    <div
      className="relative w-full overflow-hidden bg-white"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {/* Constrained background wrapper */}
      <div
        className="
      relative mx-auto w-full max-w-5xl min-h-[600px] lg:min-h-[1319px]
      flex justify-center lg:block
    "
      >
        {/* Background gradient */}
        <div
          className="
        absolute
        left-1/2 -translate-x-1/2
        top-[-30%]
        w-[160%]
        h-[700px]
        lg:left-auto lg:translate-x-0
        lg:inset-x-[-30%] lg:top-[-35%]
        lg:h-[1063.729px]
      "
        >
          <img
            alt=""
            src="/images/maintenance/subtract.svg"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Ellipse 3 */}
        <div
          className="
        absolute
        left-1/2 -translate-x-1/2
        top-[10%]
        w-[300px] h-[300px]
        lg:left-[15.31px] lg:top-[24.22px]
        lg:w-[634.572px] lg:h-[634.572px]
        lg:translate-x-0
      "
        >
          <img
            alt=""
            src="/images/maintenance/ellipse-3.svg"
            className="w-full h-full object-contain rotate-180"
          />
        </div>

        {/* Ellipse 4 */}
        <div
          className="
        absolute
        left-1/2 -translate-x-1/2
        top-[-5%]
        w-[350px] h-[350px]
        lg:left-[-24.56px] lg:top-[-15.65px]
        lg:w-[714.314px] lg:h-[714.314px]
        lg:translate-x-0
      "
        >
          <img
            alt=""
            src="/images/maintenance/ellipse-4.svg"
            className="w-full h-full object-contain rotate-180"
          />
        </div>

        {/* WM Logo */}
        <div
          className="
        absolute
        left-1/2 -translate-x-1/2
        top-[22%]
        lg:inset-[7.16%_59.73%_55.38%_5.93%]
        lg:translate-x-0
        flex justify-center
      "
        >
          <img
            alt="WM Logo"
            src="/images/maintenance/vector.svg"
            className="w-[100px] sm:w-[130px] lg:w-full"
          />
        </div>
      </div>
    </div>
  );
}
