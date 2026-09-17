const faqs = [
  { question: "Where does the event take place?", answer: <> <p>Bitz Up! Beachside Book Bash is taking place at the Panama City Beach Event Center at Edgewater Beach & Golf Resort.</p><p className="mt-3 font-bold">520 Richard Jackson Blvd<br />Panama City Beach, FL 32407</p></> },
  { question: "Is there a room block?", answer: <> <p>No. Edgewater is a condo resort, not a traditional hotel, which is why you may see different addresses when searching. Because this is a holiday weekend, room blocks aren’t cost-effective, so we recommend booking the hotel or condo that works best for you.</p><p className="mt-3 font-bold">The two closest walkable options are:</p><ul className="mt-2 list-disc pl-6"><li>Edgewater Beach Resort condos</li><li>Holiday Inn Resort Panama City Beach hotel</li></ul></> },
  { question: "Why don't you sell companion tickets at a lower price point?", answer: <> <p>While we don’t offer a separate companion ticket, we do offer General Admission tickets for $75. VIP tickets are $175. If you’d like your partner to attend the morning session with you, GA is a great option.</p><p className="mt-3">There is also an intentional break halfway through the day so you can unload books back to your vehicle or where you’re staying.</p><p className="mt-3">We’re intentional about not overselling tickets so the space stays comfortable and enjoyable. Readers are always our priority, and that won’t change. 💖</p></> },
  { question: "Will you have volunteers?", answer: <p>Yes 🥰 Our volunteer interest form is live and can be filled out <a href="https://bit.ly/4aDtqxg" target="_blank" rel="noreferrer" className="font-bold text-[#DB2487] underline">here</a>.</p> },
  { question: "I'd love to see [author] attend! Will more be added?", answer: <p>Our author interest form/waitlist is available <a href="http://bit.ly/4qQwf49" target="_blank" rel="noreferrer" className="font-bold text-[#DB2487] underline">here</a>.</p> },
  { question: "Are tickets still available?", answer: <p>Snag tickets <a href="https://www.tickettailor.com/events/jibbly/1693858" target="_blank" rel="noreferrer" className="font-bold text-[#DB2487] underline">here</a>.</p> },
  { question: "Where can I find the most up-to-date info?", answer: <p>Join the Attendee Group on Facebook to stay in the loop and get first dibs on ticket sales, preorder options, and exclusive announcements.</p> },
];

export default function FAQsPage() {
  return (
    <main className="min-h-screen bg-[#fff7fb] px-6 py-10 text-[#2d1230]">
      <div className="mx-auto max-w-5xl">
        <img src="/brittany-portfolio/demos/bitz-up/logos/bitzup-logo.png" alt="Bitz Up!" className="mx-auto mb-8 w-full max-w-md" />
        <p className="text-center text-sm font-bold tracking-[0.25em] text-[#126e83]">May 29, 2027 | Panama City Beach, Florida | Hosted by Jibbly</p>
        <h1 className="bitz-heading mt-4 text-center text-6xl text-[#DB2487]">Frequently Asked Questions</h1>
        <div className="mt-12 space-y-5">
          {faqs.map((faq) => (
            <section key={faq.question} className="rounded-[2rem] bg-white p-7 shadow-xl">
              <h2 className="bitz-heading text-3xl text-[#126e83]">{faq.question}</h2>
              <div className="mt-3 leading-relaxed text-gray-700">{faq.answer}</div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
