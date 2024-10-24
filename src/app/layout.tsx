import { InformationDialog } from "@/components/dialog/informationDialog";
import QueryProvider from "@/components/layout/queryProvider";
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";
import { Provider } from "jotai";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata = {
  title: "Pharmacy Information System (PhIS)",
  description:
    "Pharmacy Information System (PhIS) is brought to you by the Ministry of Health, Malaysia (KKM).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCReactProvider>
          <QueryProvider>
            <Provider>
              {children}
              <Toaster richColors duration={5000} closeButton />
              <InformationDialog />
            </Provider>
          </QueryProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
