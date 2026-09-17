const buttons = [
  { label: "Attending Authors", href: "/demos/bitz-up/authors/" },
  { label: "Tickets", href: "/demos/bitz-up/dashboard/", external: false },
  { label: "Programming", href: "/demos/bitz-up/programming/" },
  { label: "FAQs", href: "/demos/bitz-up/faqs/" },
  { label: "Event Map", href: "/demos/bitz-up/map/" },
  { label: "Exclusive Event Merchandise", href: "/demos/bitz-up/merch/" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff5f9] text-[#2d1230]">
      <div
        className="absolute inset-0 hidden bg-contain bg-center bg-no-repeat lg:block"
        style={{ backgroundImage: "url('/demos/bitz-up/backgrounds/desktop-bg.png')" }}
      />
      <div
        className="absolute inset-0 hidden bg-contain bg-center bg-no-repeat md:block lg:hidden"
        style={{ backgroundImage: "url('/demos/bitz-up/backgrounds/tablet-bg.png')" }}
      />
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: "url('/demos/bitz-up/backgrounds/mobile-bg.png')" }}
      />
      <div className="absolute inset-0 bg-[#fff5f9]/70" />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <img src="/demos/bitz-up/logos/bitzup-logo.png" alt="Bitz Up!" className="mb-12 w-full max-w-xl" />

        <div className="grid w-full max-w-5xl gap-5 md:grid-cols-2">
          {buttons.map((button) => (
            <a
              key={button.label}
              href={button.href}
              target={button.external ? "_blank" : undefined}
              rel={button.external ? "noreferrer" : undefined}
              className="rounded-3xl bg-[#126e83] px-8 py-6 text-center text-2xl font-bold text-white shadow-xl transition hover:bg-[#DB2487]"
            >
              {button.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
