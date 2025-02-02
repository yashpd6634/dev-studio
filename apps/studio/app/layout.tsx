import "@repo/ui/globals.css";
import ModalProvider from "@repo/ui/providers/modal-provider";
import { ThemeProvider } from "@repo/ui/providers/theme-provider";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from "@repo/ui/components/ui/sonner";
import { BillingProvider } from "@repo/ui/providers/billing-provider";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Studio.",
  description: "Lets Build With Dev Studio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BillingProvider>
            <ModalProvider>
              {children}
              <Toaster richColors />
            </ModalProvider>
          </BillingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
