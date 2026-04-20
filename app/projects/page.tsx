import Link from "next/link";

const projects = [
  {
    title: "AI-Assisted Network Defense",
    href: "/projects/ai-network-defense",
    description:
      "Current networking term project comparing how AI and LLM-based tools can help identify malicious network traffic, recognize attack indicators, and support defensive analysis in simulated environments.",
    tags: ["AI Security", "Network Analysis", "Threat Detection"],
  },
  {
    title: "Enterprise Attack Simulation Lab",
    href: "/projects/sim-lab",
    description:
      "Built an isolated multi-VM lab to simulate phishing, credential theft, SMB share abuse, and attacker movement while monitoring activity through packet analysis and security documentation.",
    tags: ["Attack Simulation", "Phishing", "Incident Response"],
  },
  {
    title: "Web Application Security Assessment & Vulnerability Analysis",
    href: "/projects/raspberry-pi-server",
    description:
      "Security-focused term project examining how a Raspberry Pi server could be attacked, analyzed, and hardened through testing, weakness identification, and defensive improvements.",
    tags: ["Web Security", "Vulnerability Analysis", "Penetration Testing"],
  },
  {
    title: "AI-Assisted Cryptanalysis: Capabilities, Limits, and Post-Quantum Implications",
    href: "/projects/ai-cryptanalysis",
    description:
      "Research project exploring how AI can support cryptanalysis, identify patterns in encrypted text, and contribute to cybersecurity research at the intersection of machine learning and cryptography.",
    tags: ["Cryptography", "Machine Learning", "Security Research"],
  },
];

const technicalProjects = [
  {
    title: "Cybersecurity Portfolio Website",
    liveHref: "https://jordynbostick.com",
    description:
      "Designed and built my personal cybersecurity portfolio website using Next.js, React, and Tailwind CSS. The site serves as a live platform to present cybersecurity labs, technical projects, and security research.",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Vercel",
      "GitHub",
      "Custom Domain",
      "UI Design",
    ],
  },
];

export default function ProjectsPage() {
  return (
    <main className="relative z-10 min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="sticky top-6 z-20 mb-14">
          <div className="flex items-center justify-between rounded-2xl border border-fuchsia-400/20 bg-black/45 px-5 py-3 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.08)]">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/70">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)] animate-pulse" />
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

        <section className="relative mb-12 rounded-[28px] border border-fuchsia-400/20 bg-black/50 p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(236,72,153,0.08)] md:p-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-fuchsia-200">
            Project Archive
          </div>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Projects
          </h1>

          <p className="mt-4 max-w-4xl text-base leading-7 text-white/70 md:text-lg">
            A collection of academic and technical cybersecurity projects focused on
            network defense, attack simulation, vulnerability analysis, and security
            research.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              "AI + Security Research",
              "Attack Simulation Labs",
              "Vulnerability Analysis",
              "Academic Cyber Projects",
            ].map((item) => (
              <div
                key={item}
                className="relative overflow-hidden rounded-2xl border border-fuchsia-400/20 bg-black/40 p-3 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.08)] transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.14)]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="relative">
          <div className="mb-8 rounded-[24px] border border-fuchsia-400/20 bg-black/45 p-6 backdrop-blur-md shadow-[0_0_24px_rgba(236,72,153,0.08)]">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-fuchsia-300/70">
              Core Security Projects
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-wide text-white">
              Security-Focused Work
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
              Hands-on and academic cybersecurity projects focused on network defense,
              attack simulation, vulnerability analysis, and security research.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group relative overflow-hidden rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-6 backdrop-blur-md transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.12)] md:p-7"
              >
                <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:32px_32px]" />

                <div className="relative z-10">
                  <h2 className="text-2xl font-semibold text-white">
                    {project.title}
                  </h2>

                  <div className="mb-4 mt-3 flex flex-wrap gap-2 text-xs font-mono">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-fuchsia-400/30 bg-black/40 px-2 py-1 text-fuchsia-300 transition group-hover:shadow-[0_0_8px_rgba(236,72,153,0.35)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mb-5 text-sm leading-7 text-white/75 md:text-[15px]">
                    {project.description}
                  </p>

                  <div className="border-t border-white/10 pt-4">
                    <Link
                      href={project.href}
                      className="text-sm font-medium text-fuchsia-300 transition hover:text-fuchsia-200 hover:drop-shadow-[0_0_6px_rgba(236,72,153,0.7)]"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="relative pt-6">
          <div className="mb-8 rounded-[24px] border border-fuchsia-400/20 bg-black/45 p-6 backdrop-blur-md shadow-[0_0_24px_rgba(236,72,153,0.08)]">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-fuchsia-300/70">
              Additional Technical Projects
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-wide text-white">
              Development & Infrastructure
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
              Technical builds that support my cybersecurity work through development,
              deployment, and personal infrastructure projects.
            </p>
          </div>

          <div className="grid gap-8">
            {technicalProjects.map((project) => (
              <article
                key={project.title}
                className="group relative overflow-hidden rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-6 backdrop-blur-md transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.12)] md:p-7"
              >
                <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:32px_32px]" />

                <div className="relative z-10">
                  <h2 className="text-2xl font-semibold text-white">
                    {project.title}
                  </h2>

                  <div className="mb-4 mt-3 flex flex-wrap gap-2 text-xs font-mono">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-fuchsia-400/30 bg-black/40 px-2 py-1 text-fuchsia-300 transition group-hover:shadow-[0_0_8px_rgba(236,72,153,0.35)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mb-5 text-sm leading-7 text-white/75 md:text-[15px]">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-6 border-t border-white/10 pt-4 text-sm">

                    <span className="text-white/40 italic">
                      Source code will be available after final documentation.
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}