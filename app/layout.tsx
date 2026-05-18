import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Geist, Playfair_Display, Geist_Mono, Inter } from 'next/font/google'
import { Toaster } from "react-hot-toast";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Holding",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${geistMono.variable} ${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          enableSystem
          disableTransitionOnChange
        > 
          <Toaster
                position="top-right"
                toastOptions={{
                duration: 6000,
                style: { borderRadius: '10px' },
                }}
            />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
