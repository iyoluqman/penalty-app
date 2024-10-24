import Background from "@/components/layout/background";
import CloseOrRedirect from "@/components/layout/close";
import DateTimeDisplay from "@/components/layout/dateTimeDisplay";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Background>
      <CloseOrRedirect />
      <div className="flex h-full flex-col rounded-lg border-2 border-indigo-300 px-4 py-4">
        <div className="h-full w-full">
          <div className="-mb-16 flex flex-row justify-between">
            <div />
            <DateTimeDisplay />
          </div>
          <div className="flex h-full items-center justify-center">
            <div className="m-auto grid max-w-lg place-items-center">
              <div className="relative h-40 w-40">
                <Image
                  src="/logo/kkm.png"
                  className="object-contain"
                  fill
                  sizes="100%"
                  alt="KKM"
                  priority
                />
              </div>
              <h1 className="text-center text-4xl font-medium">
                <span className="text-2xl">Ministry of Health Malaysia</span>
                <br />
                {/* Pharmacy Information System */}
              </h1>
              <div className="flex gap-x-2">
                <Link
                  href="/auth/sign_in"
                  prefetch={false}
                  className="mt-4 rounded-lg bg-purple-700 px-4 py-2 text-white hover:bg-purple-600"
                >
                  Sign in
                </Link>
              </div>

              <div className="mt-2 text-sm">
                <Link
                  href="/forgot_password"
                  className="text-purple-700 hover:text-purple-600"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
}
