"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Attendee = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  ticket_type: string | null;
  ticket_id: string | null;
  order_id: string | null;
  access_level: string | null;
  checked_in: string | boolean | null;
};

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState("");
  const [tickets, setTickets] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugMessage, setDebugMessage] = useState("");

  useEffect(() => {
    async function loadTickets() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user?.email) {
        setDebugMessage("No logged-in user found.");
        setLoading(false);
        return;
      }

      const email = user.email.trim().toLowerCase();
      setUserEmail(email);

      const { data, error } = await supabase
        .from("Attendees")
        .select("*")
        .ilike("email", email);

      if (error) {
        setDebugMessage(error.message);
      } else {
        setTickets(data || []);
      }

      setLoading(false);
    }

    loadTickets();
  }, []);

  if (loading) {
    return (
      <main className="min-h-[75vh] py-8">
        <p className="text-center text-[#126e83]">Loading your tickets...</p>
      </main>
    );
  }

  return (
    <main className="py-8 text-[#2d1230]">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-xl sm:p-8">
        <img src="/demos/bitz-up/logos/bitzup-logo.png" alt="Bitz Up!" className="mx-auto mb-8 w-full max-w-sm" />

        <h1 className="bitz-heading text-center text-5xl text-[#126e83]">My Tickets</h1>

        <p className="mt-4 text-center text-gray-600">Logged in as <strong>{userEmail}</strong></p>

        {tickets.length > 0 ? (
          <div className="mt-8 space-y-5">
            {tickets.map((ticket, index) => (
              <div key={`${ticket.ticket_id || ticket.order_id || index}`} className="rounded-3xl border border-pink-100 bg-[#fff7fb] p-5 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-sm font-bold uppercase text-gray-500">Ticket {index + 1}</p>
                  <span className="rounded-full bg-[#126e83] px-4 py-1 text-sm font-bold text-white">{ticket.access_level || "Attendee"}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-bold uppercase text-gray-500">Name</p>
                    <p className="text-xl font-bold">{ticket.first_name || ""} {ticket.last_name || ""}</p>
                  </div>

                  <div>
                    <p className="text-sm font-bold uppercase text-gray-500">Ticket Type</p>
                    <p className="text-xl font-bold">{ticket.ticket_type || "Not listed"}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-sm font-bold uppercase text-gray-500">Order ID</p>
                      <p className="break-all font-bold">{ticket.order_id || "Not listed"}</p>
                    </div>

                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-sm font-bold uppercase text-gray-500">Ticket ID</p>
                      <p className="break-all font-bold">{ticket.ticket_id || "Not listed"}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#126e83] p-4 text-white">
                    <p className="text-sm font-bold uppercase opacity-80">Check-In Status</p>
                    <p className="text-xl font-bold">
                      {ticket.checked_in === true || String(ticket.checked_in).toLowerCase() === "yes" ? "Checked In" : "Not Checked In Yet"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-[#fff7fb] p-6 text-center">
            <p className="font-bold text-[#DB2487]">No ticket found for this email yet.</p>
            <p className="mt-2 text-gray-600">Make sure you logged in with the same email used to purchase your ticket.</p>
            {debugMessage && <p className="mt-4 text-xs text-gray-500">Debug: {debugMessage}</p>}
          </div>
        )}
      </div>
    </main>
  );
}
