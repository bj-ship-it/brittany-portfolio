export default function TicketsPage() {
  return (
    <main className="min-h-screen bg-[#fff7fb] px-6 py-10 text-center text-[#2d1230]">
      <img src="/demos/bitz-up/logos/bitzup-logo.png" alt="Bitz Up!" className="mx-auto mb-8 w-full max-w-md" />
      <h1 className="bitz-heading text-6xl text-[#DB2487]">Tickets</h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">Tickets are hosted through Ticket Tailor.</p>
      <a href="https://www.tickettailor.com/events/jibbly/1693858" target="_blank" rel="noreferrer" className="mt-10 inline-block rounded-full bg-[#126e83] px-8 py-4 text-xl font-bold text-white transition hover:bg-[#DB2487]">Open Ticket Page</a>
    </main>
  );
}
