const schedule = [
  {
    day: "Friday, May 28, 2027",
    events: [
      { time: "4:00–8:00 PM", title: "Early Registration / Check-In", description: "Pick up your badge, get settled, and get ready for signing day." },
    ],
  },
  {
    day: "Saturday, May 29, 2027",
    events: [
      { time: "9:00 AM", title: "VIP Signing Begins", description: "VIP attendees get early access to the signing room." },
      { time: "10:00 AM–1:00 PM", title: "Morning Signing Session", description: "Meet authors, collect signatures, and shop event exclusives." },
      { time: "1:00–2:30 PM", title: "Lunch Break", description: "Take a break, unload books, grab food, and reset for the afternoon session." },
      { time: "2:30–5:30 PM", title: "Afternoon Signing Session", description: "The signing room reopens for the afternoon session." },
      { time: "8:30–11:00 PM", title: "Dessert Reception After Party", description: "Celebrate the end of the event with dessert, mingling, and more." },
    ],
  },
];

export default function ProgrammingPage() {
  return (
    <main className="min-h-screen bg-[#fff7fb] px-6 py-10 text-[#2d1230]">
      <div className="mx-auto max-w-5xl">
        <img src="/demos/bitz-up/logos/bitzup-logo.png" alt="Bitz Up!" className="mx-auto mb-8 w-full max-w-md" />
        <h1 className="bitz-heading text-center text-6xl text-[#DB2487]">Programming</h1>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-gray-700">The official Bitz Up! Beachside Book Bash schedule.</p>
        <div className="mt-12 space-y-10">
          {schedule.map((day) => (
            <section key={day.day}>
              <h2 className="bitz-heading mb-5 text-5xl text-[#126e83]">{day.day}</h2>
              <div className="space-y-5">
                {day.events.map((event) => (
                  <article key={`${day.day}-${event.time}-${event.title}`} className="rounded-[2rem] bg-white p-7 shadow-xl">
                    <p className="text-lg font-black text-[#DB2487]">{event.time}</p>
                    <h3 className="bitz-heading mt-2 text-4xl text-[#126e83]">{event.title}</h3>
                    <p className="mt-3 text-gray-700">{event.description}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
