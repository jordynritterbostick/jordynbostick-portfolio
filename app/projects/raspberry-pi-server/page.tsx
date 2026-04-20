import Link from "next/link";

export default function RaspberryPiSecurityPage() {
  return (
    <main className="relative z-10 min-h-screen px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="sticky top-6 z-20 mb-14">
          <div className="flex items-center justify-between rounded-2xl border border-fuchsia-400/20 bg-black/45 px-5 py-3 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.08)]">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/70">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
                PROJECT STATUS
              </span>
              <span className="text-green-300">COMPLETE</span>
            </div>

            <Link
              href="/projects"
              className="rounded-full border border-fuchsia-400/30 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-fuchsia-300/60 hover:bg-fuchsia-400/10 hover:text-white"
            >
              ← Back
            </Link>
          </div>
        </header>

        <section className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/50 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.12)] transition duration-300 hover:border-fuchsia-300/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.20)]">
          <div className="pointer-events-none absolute -left-16 top-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-fuchsia-400/10 blur-3xl" />

          <h1 className="text-4xl font-semibold">
            Web Application Security Assessment
          </h1>

          <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
            <span className="rounded border border-fuchsia-400/30 px-2 py-1 text-fuchsia-300">
              Nmap
            </span>
            <span className="rounded border border-fuchsia-400/30 px-2 py-1 text-fuchsia-300">
              Burp Suite
            </span>
            <span className="rounded border border-fuchsia-400/30 px-2 py-1 text-fuchsia-300">
              Nikto
            </span>
            <span className="rounded border border-fuchsia-400/30 px-2 py-1 text-fuchsia-300">
              CSRF
            </span>
            <span className="rounded border border-fuchsia-400/30 px-2 py-1 text-fuchsia-300">
              Enumeration
            </span>
            <span className="rounded border border-fuchsia-400/30 px-2 py-1 text-fuchsia-300">
              Web Security
            </span>
          </div>

          <p className="mt-4 max-w-3xl leading-7 text-white/75">
            A security assessment of a custom web application hosted on a Raspberry Pi server.
            The project evaluated common web vulnerabilities using industry-standard tools
            and manual testing to identify weaknesses, demonstrate exploitation techniques,
            and implement secure remediation practices.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/50 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.12)] transition duration-300 hover:border-fuchsia-300/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.20)]">
            <h2 className="mb-3 text-xl font-semibold">Project Details</h2>

            <ul className="space-y-2 text-white/75">
              <li>
                <strong>Course:</strong> CYB 240 Ethical Hacking and Penetration Testing
              </li>
              <li>
                <strong>Type:</strong> Group term project
              </li>
              <li>
                <strong>Team Members:</strong> Christina Alli, Ryan Convery, Kevin Hubbard
              </li>
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/50 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.12)] transition duration-300 hover:border-fuchsia-300/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.20)]">
            <h2 className="mb-3 text-xl font-semibold">Tools Used</h2>

            <p className="leading-7 text-white/75">
              Nmap for service enumeration, Burp Suite for request interception and
              payload testing, Nikto for vulnerability scanning, and manual scripting
              for automated enumeration and testing.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/50 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.12)] transition duration-300 hover:border-fuchsia-300/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.20)]">
          <h2 className="mb-3 text-2xl font-semibold">Overview</h2>

          <p className="leading-7 text-white/75">
            The project focused on identifying vulnerabilities in a web application
            running on a Raspberry Pi server. Testing followed a structured
            penetration testing workflow including reconnaissance, vulnerability
            discovery, exploitation, and remediation.
          </p>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/50 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.12)] transition duration-300 hover:border-fuchsia-300/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.20)]">
          <h2 className="mb-3 text-2xl font-semibold">Key Vulnerabilities</h2>

          <p className="leading-7 text-white/75">
            The assessment identified multiple security weaknesses including email
            enumeration through inconsistent error responses and cross-site request
            forgery (CSRF) vulnerabilities in application forms. These issues allowed
            attackers to identify valid user accounts and submit unauthorized
            requests on behalf of authenticated users.
          </p>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/50 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.12)] transition duration-300 hover:border-fuchsia-300/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.20)]">
          <h2 className="mb-3 text-2xl font-semibold">Remediation</h2>

          <p className="leading-7 text-white/75">
            Security fixes were implemented including CSRF tokens, standardized error
            messages to prevent user enumeration, improved input sanitization, and
            stronger request validation. Additional improvements such as rate
            limiting and improved authentication controls were recommended.
          </p>
        </section>
      </div>
    </main>
  );
}