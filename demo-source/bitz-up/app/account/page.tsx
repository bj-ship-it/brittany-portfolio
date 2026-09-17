"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function AccountPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setEmail(user?.email || "");
    }
    loadUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <main className="py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="bitz-heading mb-8 text-5xl text-[#126e83]">Account</h1>

        {email ? (
          <div className="mb-6 rounded-3xl bg-white p-6 shadow-md">
            <p className="text-sm font-bold uppercase tracking-wide text-gray-500">Logged in as</p>
            <p className="mt-1 break-all text-xl font-bold text-[#126e83]">{email}</p>
          </div>
        ) : (
          <Link href="/login" className="mb-6 block rounded-3xl bg-[#126e83] p-6 text-center text-xl font-bold text-white shadow-md">
            Log In / Create Account
          </Link>
        )}

        <div className="space-y-4">
          <Link href="/settings" className="block rounded-3xl bg-white p-6 shadow-md transition hover:scale-[1.01]">
            <h2 className="text-xl font-bold text-[#126e83]">Settings & Privacy</h2>
          </Link>

          <Link href="/help" className="block rounded-3xl bg-white p-6 shadow-md transition hover:scale-[1.01]">
            <h2 className="text-xl font-bold text-[#126e83]">Help & Support</h2>
          </Link>

          <Link href="/terms" className="block rounded-3xl bg-white p-6 shadow-md transition hover:scale-[1.01]">
            <h2 className="text-xl font-bold text-[#126e83]">Terms & Conditions</h2>
          </Link>

          {email && (
            <button onClick={handleLogout} className="w-full rounded-3xl bg-[#DB2487] p-6 text-xl font-bold text-white shadow-lg transition hover:scale-[1.01]">
              Log Out
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
