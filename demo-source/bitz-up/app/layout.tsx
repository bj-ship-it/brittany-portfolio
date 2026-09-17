import type { Metadata } from "next";
import "./globals.css";

import AppHeader from "./components/AppHeader";
import BottomNav from "./components/BottomNav";



export const metadata: Metadata = {
  title: "Bitz Up! 2027",
  description: "Bitz Up! portfolio demo — sample account and tickets",

  icons: {
    icon: "/brittany-portfolio/demos/bitz-up/icons/bitzup-tabicon.png",
    apple: "/brittany-portfolio/demos/bitz-up/icons/bitz-up-mobile-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-[#fff7fb] text-[#2d1230]`}>
        <aside className="bg-[#126e83] px-4 py-3 text-center text-xs text-white">Portfolio demo · Sample account and tickets · Event information reflects the supplied app snapshot. <a className="underline" href="/brittany-portfolio/index.html#work">Back to portfolio</a></aside><AppHeader />
        <div className="w-full overflow-x-hidden pb-28">
  {children}
</div>
        <BottomNav />
      </body>
    </html>
  );
}
