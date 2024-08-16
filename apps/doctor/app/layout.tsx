import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

import { SessionProvider } from "@/context/SessionProvider"
import { getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/toaster"
import { DoctorProvider } from "@/context/DoctorProvider";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Medzo",
    template: "%s | Medzo"
  },
  description: "Manage your medical records with ease",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession()
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange> */}
            <DoctorProvider>
              <Toaster />
              {children}
            </DoctorProvider>
          {/* </ThemeProvider> */}
        </SessionProvider>
      </body>
    </html>
  );
}
