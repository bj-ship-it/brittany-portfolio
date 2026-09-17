const merch = ["Event Bitz", "Lanyards", "Wristlets", "Drink Carriers", "Sticker Drops", "VIP Exclusives"];

export default function MerchPage() {
  return (
    <main className="min-h-screen bg-[#fff7fb] px-6 py-10 text-[#2d1230]">
      <div className="mx-auto max-w-6xl">
        <img src="/demos/bitz-up/logos/bitzup-logo.png" alt="Bitz Up!" className="mx-auto mb-8 w-full max-w-md" />
        <h1 className="bitz-heading text-center text-6xl text-[#DB2487]">Exclusive Event Merchandise</h1>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {merch.map((item) => (
            <section key={item} className="rounded-[2rem] bg-white p-8 shadow-xl">
              <h2 className="bitz-heading text-3xl text-[#126e83]">{item}</h2>
              <p className="mt-3 text-gray-700">Details coming soon.</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
