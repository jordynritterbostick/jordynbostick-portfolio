import Link from "next/link";
import Terminal from "@/components/Terminal";

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl space-y-10">

        <header className="sticky top-6 z-20 mb-14">
          <div className="relative overflow-hidden rounded-2xl border border-fuchsia-400/20 bg-black/45 px-5 py-3 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.08)]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-fuchsia-400/10 blur-3xl" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/70">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)] animate-pulse" />
                  SYSTEM STATUS
                </span>
                <span className="text-green-300">ACTIVE</span>
              </div>

              <nav className="flex items-center gap-5 text-sm text-white/75">
                <Link href="/projects" className="transition hover:text-fuchsia-300">
                  Projects
                </Link>
                <Link href="/experience" className="transition hover:text-fuchsia-300">
                  Experience
                </Link>
                <Link href="/contact" className="transition hover:text-fuchsia-300">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <section className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/50 backdrop-blur-md p-8 shadow-[0_0_25px_rgba(236,72,153,0.12)]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-fuchsia-400/10 blur-3xl" />

          <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-fuchsia-400/10 blur-3xl" />

          <div className="relative z-10">
            <h1 className="text-5xl font-semibold mb-4 md:text-6xl">
              Jordyn Bostick
            </h1>

            <p className="text-fuchsia-300 text-lg mb-4">
              Cybersecurity Graduate (May 2026) | Incident Response | Digital Forensics | Threat Intelligence
            </p>

            <p className="text-white/80 leading-7 max-w-4xl">
              I’m a cybersecurity graduate focused on analyzing real-world threats and attacker behavior to support investigations, detection, and response.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/50 p-6 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.12)]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-fuchsia-400/10 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-fuchsia-200">
              System Terminal
            </div>

            <p className="mb-4 max-w-3xl text-sm leading-7 text-white/70">
              Use quick commands to navigate the site. Try 'help' for a list of commands.
            </p>

            <Terminal />
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">

          <div className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/45 backdrop-blur-md p-8 shadow-[0_0_25px_rgba(236,72,153,0.12)] transition hover:border-fuchsia-300/40">
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-fuchsia-400/10 blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-3">
                Experience
              </h2>

              <p className="text-white/70 mb-6 leading-7">
                Learn more about my education, internships, technical roles, and hands-on
                cybersecurity work.
              </p>

              <Link
                href="/experience"
                className="inline-block rounded-lg border border-fuchsia-400/30 bg-fuchsia-500/15 px-4 py-2 text-sm text-fuchsia-200 hover:bg-fuchsia-500/25 transition"
              >
                View Experience →
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/45 backdrop-blur-md p-8 shadow-[0_0_25px_rgba(236,72,153,0.12)] transition hover:border-fuchsia-300/40">
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-fuchsia-400/10 blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-3">
                Projects
              </h2>

              <p className="text-white/70 mb-6 leading-7">
                Explore my cybersecurity labs, simulated attacks, and technical
                investigations.
              </p>

              <Link
                href="/projects"
                className="inline-block rounded-lg border border-fuchsia-400/30 bg-fuchsia-500/15 px-4 py-2 text-sm text-fuchsia-200 hover:bg-fuchsia-500/25 transition"
              >
                View Projects →
              </Link>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-amber-400/30 bg-black/45 p-6 backdrop-blur-md shadow-[0_0_30px_rgba(251,191,36,0.10)]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="pointer-events-none absolute -left-10 top-0 h-36 w-36 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.28em] text-amber-200/80">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.8)] animate-pulse" />
                Security Advisory
              </span>
              <span className="text-amber-300">April 2026</span>
            </div>

            <div className="rounded-2xl border border-amber-400/15 bg-black/50 p-5 font-mono text-sm leading-7 text-white/80">
              <p className="text-amber-200">[SECURITY LOG — APRIL 2026]</p>
              <p>
                Status: <span className="text-green-300">VERIFIED</span>
              </p>
              <p>
                Environment Variables: <span className="text-amber-100">NONE FOUND</span>
              </p>
              <p>
                API Keys: <span className="text-amber-100">NONE IN USE</span>
              </p>
              <p>
                OAuth Integrations: <span className="text-amber-100">REVIEWED</span>
              </p>
              <p>
                Action: <span className="text-green-300">NO EXPOSURE DETECTED</span>
              </p>

              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

              <p className="mt-4 text-white/60">
                Note: Post-incident audit completed following Vercel breach.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
