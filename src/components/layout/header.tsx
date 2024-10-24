//import Image from "next/image";
import Link from "next/link";
import MobileSidebar from "./mobileSidebar";

export default function Header() {
  // let [isScrolled, setIsScrolled] = useState(false);
  // useEffect(() => {
  //   function onScroll() {
  //     setIsScrolled(window.scrollY > 0);
  //   }
  //   onScroll();
  //   window.addEventListener("scroll", onScroll, { passive: true });
  //   return () => {
  //     window.removeEventListener("scroll", onScroll);
  //   };
  // }, []);

  return (
    <header className="sticky top-0 z-10 flex h-16 flex-col gap-x-4 border-b border-gray-200 bg-white/75 shadow-sm backdrop-blur backdrop-filter dark:bg-black/75 dark:text-white lg:shadow-none">
      <div className="flex flex-row justify-around bg-slate-700 px-4 text-white">
        <p className="text-center text-xs">
          PhIS & CPS: v2.6.x{" "}
          <span className="hidden lg:inline">
            Last Modified: 6/12/2022 9:00 AM
          </span>
        </p>
        <p className="text-center text-xs">
          User: System PhIS;{" "}
          <span className="hidden lg:inline">
            Unit: Farmasi Logistik Hospital
          </span>
        </p>
      </div>
      <div className="flex h-full w-full items-center gap-x-4 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:mx-auto lg:max-w-7xl lg:px-8 lg:shadow-none">
        <div className="mr-2 flex lg:hidden">
          <MobileSidebar />
        </div>
        {/* Separator */}
        <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

        {/* <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6"> */}
        <div className="relative flex flex-grow basis-0 items-center">
          <Link
            href="/"
            aria-label="PhIS"
            className="flex items-center gap-x-3"
          >
            {/* <Image width={40} height={40} src="/logo/kkm.png" alt="PhIS" /> */}
            <div className="relative h-11 w-11">
              {/*<Image
                src="/logo/kkm.png"
                className="object-contain"
                fill
                sizes="100%"
                alt="PhIS"
                priority
              />*/}
            </div>
            <span className="hidden lg:block">
              Pharmacy Information System (PhIS)
            </span>
            <span className="lg:hidden">PhIS</span>
          </Link>
        </div>
        {/* <div className="-my-5 mr-6 sm:mr-8 md:mr-0">
          <Search />
        </div> */}
        <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
          {/* <a href="https://github.com" className="group" aria-label="GitHub">
            Github
          </a> */}
        </div>
      </div>
    </header>
  );
}
