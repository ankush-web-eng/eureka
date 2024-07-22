import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { SessionProvider } from "@/context/SessionProvider";
import { getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/toaster"
import { CityProvider } from "@/context/cityContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "MedZo",
    template: "%s | MedZo"
  },
  description: "Book your appointment with your favourite doctor",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Toaster />
          <CityProvider>
            {children}
          </CityProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
