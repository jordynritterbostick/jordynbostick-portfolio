import Image from "next/image";
import Link from "next/link";

export default function WhoAmIPage() {
  return (
    <main className="relative z-10 min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="sticky top-6 z-20">
          <div className="relative overflow-hidden rounded-2xl border border-fuchsia-400/20 bg-black/45 px-5 py-3 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.08)]">
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/70">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                  SYSTEM STATUS
                </span>
                <span className="text-green-300">ACTIVE</span>
              </div>

              <Link
                href="/"
                className="rounded-full border border-fuchsia-400/20 bg-black/40 px-3 py-1 text-xs font-mono text-white/60 transition hover:border-fuchsia-300/50 hover:text-fuchsia-200"
              >
                EXIT
              </Link>
            </div>
          </div>
        </header>

        <section className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/55 p-6 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.12)] md:p-8">
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-fuchsia-400/10 blur-3xl" />

          <div className="relative z-10 space-y-4 font-mono text-sm text-fuchsia-300">
            <p>&gt; whoami</p>
            <p className="text-white/40">initializing...</p>

            <div className="space-y-1 text-white/70">
              <p>user: jordyn_bostick</p>
              <p>role: cybersecurity student</p>
              <p>status: active</p>
            </div>

            <p className="text-white/40">loading profile...</p>

            <div>
              <p className="mb-2 text-xs text-white/40">[image loaded]</p>
              <Image
                src="/images/jordyn.jpg"
                alt="Jordyn"
                width={384}
                height={512}
                className="w-72 rounded-2xl border border-fuchsia-400/20 object-cover shadow-[0_0_25px_rgba(236,72,153,0.12)] md:w-80 lg:w-96"
              />
            </div>

            <p className="leading-7 text-white/80">
              I don’t just want to know what an attack looks like — I want to
              understand how it starts, how it moves, and how to realistically
              respond to it.
            </p>

            <p className="leading-7 text-white/80">
              I don’t enjoy surface-level explanations. I like building things,
              breaking them, and figuring out what’s happening underneath. That’s
              how I learn best, even if it’s a little messy at first.
            </p>

            <div className="space-y-1 text-white/70">
              <p>focus:</p>
              <p>- incident response</p>
              <p>- digital forensics</p>
              <p>- cyber threat intelligence</p>
            </div>

            <p className="leading-7 text-white/80">
              Most of what I build is meant to feel like real environments where
              something could actually happen, and where detection and response
              actually matter.
            </p>

            <p className="pt-4 text-xs text-white/30">access level: limited</p>
          </div>
        </section>
      </div>
    </main>
  );
}