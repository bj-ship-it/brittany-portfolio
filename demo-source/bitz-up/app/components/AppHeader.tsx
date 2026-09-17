"use client";

import Link from "next/link";
import Image from "next/image";

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#126e83]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#f6d8ea] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-lg items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image src="/demos/bitz-up/logos/bitzup-logo.png" alt="Bitz Up!" width={170} height={60} className="h-auto w-[150px] sm:w-[170px]" priority />
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/notifications" aria-label="Notifications" className="rounded-full p-2 transition hover:scale-110 hover:bg-[#fff7fb]">
            <BellIcon />
          </Link>

          <Link href="/account" aria-label="Account" className="rounded-full p-1 transition hover:scale-110 hover:bg-[#fff7fb]">
            <Image src="/demos/bitz-up/icons/account-icon.png" alt="Account" width={34} height={34} className="h-9 w-9 object-contain" />
          </Link>
        </div>
      </div>
    </header>
  );
}
