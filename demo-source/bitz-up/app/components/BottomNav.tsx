"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/", icon: "/brittany-portfolio/demos/bitz-up/icons/home-icon.png", activeIcon: "/brittany-portfolio/demos/bitz-up/icons/home-icon-selected.png" },
  { label: "Authors", href: "/authors", icon: "/brittany-portfolio/demos/bitz-up/icons/author-icon.png", activeIcon: "/brittany-portfolio/demos/bitz-up/icons/author-icon-selected.png" },
  { label: "Tickets", href: "/dashboard", icon: "/brittany-portfolio/demos/bitz-up/icons/tickets-icon.png", activeIcon: "/brittany-portfolio/demos/bitz-up/icons/tickets-icon-selected.png" },
  { label: "Map", href: "/map", icon: "/brittany-portfolio/demos/bitz-up/icons/map-icon.png", activeIcon: "/brittany-portfolio/demos/bitz-up/icons/map-icon-selected.png" },
  { label: "Schedule", href: "/programming", icon: "/brittany-portfolio/demos/bitz-up/icons/program-icon.png", activeIcon: "/brittany-portfolio/demos/bitz-up/icons/program-icon-selected.png" },
  { label: "Merch", href: "/merch", icon: "/brittany-portfolio/demos/bitz-up/icons/merch-icon.png", activeIcon: "/brittany-portfolio/demos/bitz-up/icons/merch-icon-selected.png" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#f6d8ea] bg-white/95 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="mx-auto grid h-20 w-full max-w-lg grid-cols-6 px-3">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center gap-1 transition-all duration-200">
              <Image src={active ? item.activeIcon : item.icon} alt={item.label} width={28} height={28} className={`transition-all duration-200 ${active ? "scale-110" : "opacity-80"}`} />
              <span className={`text-[10px] font-semibold tracking-wide ${active ? "text-[#DB2487]" : "text-[#126e83]"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
