import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from 'next/font/google'
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next"

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  weight: ['600', '700', '800'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${bricolage.variable} ${jakarta.variable}  h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          enableSystem
          disableTransitionOnChange
        > 
          <LanguageProvider>
            <Toaster
                  position="top-right"
                  toastOptions={{
                  duration: 6000,
                  style: { borderRadius: '10px' },
                }}
            />
            {children}
          </LanguageProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
