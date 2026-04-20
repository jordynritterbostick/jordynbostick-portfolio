import Link from "next/link";

const contactItems = [
  {
    label: "Email",
    value: "jordynritterbostick@gmail.com",
    href: "mailto:jordynritterbostick@gmail.com",
    status: "DIRECT",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/jordynbostick",
    href: "https://www.linkedin.com/in/jordynbostick",
    status: "PROFESSIONAL",
  },
  {
    label: "Location",
    value: "New Jersey",
    href: "",
    status: "BASE",
  },
];

export default function ContactPage() {
  return (
    <main className="relative z-10 min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl space-y-10">

        <header className="sticky top-6 z-20 mb-14">
          <div className="flex items-center justify-between rounded-2xl border border-fuchsia-400/20 bg-black/45 px-5 py-3 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.08)]">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/70">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)] animate-pulse"></span>
                SYSTEM STATUS
              </span>
              <span className="text-green-300">ACTIVE</span>
            </div>

            <Link
              href="/"
              className="rounded-full border border-fuchsia-400/30 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-fuchsia-300/60 hover:bg-fuchsia-400/10 hover:text-white"
            >
              ← Back
            </Link>
          </div>
        </header>

        {/* HERO */}
        <section className="relative mb-12 rounded-[28px] border border-fuchsia-400/20 bg-black/50 p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(236,72,153,0.08)] md:p-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-fuchsia-200">
            Contact Node
          </div>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Contact
          </h1>

          <p className="mt-4 max-w-4xl text-base leading-8 text-white/70 md:text-lg">
            I’m always open to connecting about cybersecurity, internships, research,
            projects, and professional opportunities. Feel free to reach out.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {contactItems.map((item, index) => (
            <div
              key={item.label}
              className="group relative overflow-hidden rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-6 backdrop-blur-md transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.12)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />

              <div className="relative z-10">
                <div className="mb-3 inline-flex items-center rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-fuchsia-200">
                  {item.status}
                </div>

                <h2 className="text-2xl font-semibold text-white">{item.label}</h2>

                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="mt-3 block break-all text-white/75 transition hover:text-fuchsia-300 hover:drop-shadow-[0_0_6px_rgba(236,72,153,0.7)]"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-3 text-white/75">{item.value}</p>
                )}

                <div className="mt-6 border-t border-white/10 pt-4 text-xs font-mono uppercase tracking-[0.2em] text-white/35">
                  Node {String(index + 1).padStart(2, "0")} / Contact Pathway
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}