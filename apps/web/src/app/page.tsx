"use client";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001935] via-[#000b1b] to-[#000614] text-white relative">

      {/* BLUR BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[700px] h-[700px] bg-blue-700/20 blur-[160px] -top-40 -left-40 rounded-full" />
        <div className="absolute w-[600px] h-[600px] bg-blue-500/10 blur-[180px] bottom-[-100px] right-[-100px] rounded-full" />
        <div className="absolute w-[450px] h-[450px] bg-blue-300/10 blur-[140px] top-1/3 left-1/2 -translate-x-1/2 rounded-full" />
      </div>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-24 grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* LEFT TEXT */}
        <div>
          <p className="text-blue-400 tracking-wide mb-3 text-lg">
            Experience Events Differently
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Organize & Discover  
            <br />
            <span className="text-blue-400">Campus Events</span>
            <br />
            Seamlessly.
          </h1>

          <p className="mt-6 text-slate-300 text-lg leading-relaxed">
            All your college events — fests, hackathons, cultural shows, 
            workshops, and parties — beautifully listed in one smooth dashboard.
          </p>

          <div className="flex items-center space-x-6 mt-8">
            <button className="px-8 py-3 bg-blue-600 rounded-xl text-lg font-medium hover:bg-blue-500 transition">
              Explore Events
            </button>
            <button className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition">
              <span>Watch Promo</span> →
            </button>
          </div>
        </div>

        {/* RIGHT HERO IMAGE */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-blue-800/40">
            <img
              src="/hero-event.jpg"
              alt="Event"
              className="object-cover w-full h-[450px] brightness-105"
            />
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section className="max-w-7xl mx-auto px-6 mt-32 mb-20 relative z-10">
        <h2 className="text-4xl font-bold mb-10">
          Why <span className="text-blue-400">choose us</span>?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Feature
            color="bg-blue-400"
            title="Ready-made Event Ideas"
            desc="Plan tech fests, hackathons & cultural nights effortlessly."
          />

          <Feature
            color="bg-blue-500"
            title="Fast Registrations"
            desc="QR check-ins, instant sign-ups, smooth attendee flow."
          />

          <Feature
            color="bg-blue-600"
            title="Unlimited Clubs"
            desc="Manage multiple teams under one unified dashboard."
          />
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <Stat num="103+" label="Events Hosted" />
          <Stat num="7" label="Active Clubs" />
          <Stat num="5500+" label="Students Engaged" />
          <Stat num="4 Years" label="Experience" />
        </div>
      </section>
    </div>
  );
}

function Feature({ color, title, desc }: { color: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl p-8 bg-[#021027] border border-white/10 hover:bg-[#061a36] transition cursor-pointer">
      <div className={`w-14 h-14 ${color} rounded-xl mb-6 opacity-90`} />
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-300">{desc}</p>
    </div>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div className="p-8 rounded-2xl bg-[#021027] border border-white/10">
      <div className="text-4xl font-bold text-blue-400 mb-2">{num}</div>
      <p className="text-slate-300">{label}</p>
    </div>
  );
}

