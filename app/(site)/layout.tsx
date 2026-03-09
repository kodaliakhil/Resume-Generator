import type { Metadata } from "next";
import "@/app/globals.css";
import { Header } from "@/components/layout/Header";
import { ToasterProvider } from "@/components/toast/useToast";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/toast/Toaster";

export const metadata: Metadata = {
  title: "ResumeGen - Latex Resume Builder",
  description: "Generated professional resumes from form data using Latex templates.",
  icons: { icon: "/file.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"min-h-screen antialiased"}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 rounded bg-blue px-3 py-2 text-white"
        >
          Skip to content
        </a>
        <ToasterProvider>
        <Header/>
        <main id="main-content" className="container my-8">
          {children}
        </main>
        <Footer/>
        <Toaster/>
        </ToasterProvider>
      </body>
    </html>
  );
}
