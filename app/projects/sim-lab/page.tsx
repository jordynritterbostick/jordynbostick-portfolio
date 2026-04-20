import Image from "next/image";
import Link from "next/link";

const attackFlow = [
  {
    step: "01",
    title: "Phishing Email",
    description:
      "A phishing email was delivered to an internal user through a simulated campaign, creating the initial entry point into the environment.",
    image: "/images/projectimages/boro1/phishing-email.jpg",
    alt: "Phishing email slide",
  },
  {
    step: "02",
    title: "Payload Delivery",
    description:
      "The victim was directed to a fake internal media portal that triggered a drive-by download and included a keylogger component.",
    image: "/images/projectimages/boro1/payload-1.jpg",
    alt: "Payload delivery slide",
  },
  {
    step: "03",
    title: "Credential Capture",
    description:
      "Captured credentials were used to authenticate into internal resources and begin post-compromise activity.",
    image: "/images/projectimages/boro1/payload-2.jpg",
    alt: "Credential capture slide",
  },
  {
    step: "04",
    title: "Detection",
    description:
      "Wireshark packet analysis showed SMB traffic, including share access and file retrieval activity tied to the incident.",
    image: "/images/projectimages/boro1/detection.jpg",
    alt: "Detection slide with Wireshark evidence",
  },
];

const impactCards = [
  {
    title: "Unauthorized SMB Access",
    body: "The attacker authenticated to the BoroShare SMB share and enumerated internal files.",
  },
  {
    title: "Sensitive File Exposure",
    body: "Payroll and internal files were accessed, demonstrating clear confidentiality risk.",
  },
  {
    title: "Lateral Movement Risk",
    body: "Improperly stored credentials enabled pivoting from one compromised user context to another.",
  },
  {
    title: "Business Impact",
    body: "The scenario showed realistic risk tied to payroll exposure, employee trust, and broader internal compromise.",
  },
];

const fixes = [
  "Restrict SMB access to authorized internal hosts only",
  "Implement stronger access controls and least privilege",
  "Block unnecessary exposure to TCP port 445",
  "Enforce stronger password practices and prevent credential reuse",
  "Add monitoring and alerting for abnormal SMB activity",
  "Improve user awareness around phishing and suspicious downloads",
];

export default function BoroManufacturingPage() {
  return (
    <main className="relative z-10 min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="sticky top-6 z-20">
          <div className="flex items-center justify-between rounded-2xl border border-fuchsia-400/20 bg-black/45 px-5 py-3 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.08)]">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/70">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
                CASE STATUS
              </span>
              <span className="text-green-300">CONTAINED</span>
            </div>

            <Link
              href="/projects"
              className="rounded-full border border-fuchsia-400/30 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-fuchsia-300/60 hover:bg-fuchsia-400/10 hover:text-white"
            >
              ← Back
            </Link>
          </div>
        </header>

        <section className="relative overflow-hidden rounded-[30px] border border-fuchsia-400/20 bg-black/50 p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(236,72,153,0.08)] md:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:34px_34px]" />

          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-fuchsia-200">
              Incident Response Case Study
            </div>

            <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Enterprise Attack Simulation:
              <span className="block text-fuchsia-300">Boro Manufacturing</span>
            </h1>

            <p className="mt-5 max-w-4xl text-base leading-7 text-white/75 md:text-lg">
              A controlled enterprise attack simulation focused on phishing,
              credential compromise, SMB share abuse, lateral movement, and
              incident response documentation inside an isolated multi-VM lab.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {[
                "Phishing",
                "Credential Compromise",
                "SMB Abuse",
                "Incident Response",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-fuchsia-400/20 bg-black/40 p-3 text-sm text-white/80 backdrop-blur-md shadow-[0_0_18px_rgba(236,72,153,0.08)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-7 backdrop-blur-md shadow-[0_0_24px_rgba(236,72,153,0.08)]">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-fuchsia-300/70">
              Overview
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Project Summary
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/75 md:text-[15px]">
              This project simulated how a phishing-based compromise can turn
              into internal file share access and sensitive data exposure. After
              initial access, valid credentials were used against an exposed SMB
              share, allowing the attacker to enumerate internal files and
              retrieve sensitive data. The incident was then documented through
              an incident response report and a firewall change request tied to
              containment.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-fuchsia-300/70">
                  Environment
                </p>
                <p className="mt-2 text-sm leading-7 text-white/75">
                  Five-VM lab using VMware with a Kali attacker, Ubuntu file
                  server, SOC workstation, and Windows employee systems.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-fuchsia-300/70">
                  Main Focus
                </p>
                <p className="mt-2 text-sm leading-7 text-white/75">
                  Phishing, keylogging, credential abuse, SMB enumeration,
                  evidence collection, and defensive containment.
                </p>
              </div>
            </div>
          </article>

          <aside className="rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-7 backdrop-blur-md shadow-[0_0_24px_rgba(236,72,153,0.08)]">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-fuchsia-300/70">
              Quick Stats
            </p>
            <div className="mt-4 space-y-4">
              {[
                ["Affected Asset", "CORP-FS-01"],
                ["Primary Service", "SMB / Port 445"],
                ["Primary Share", "BoroShare"],
                ["Risk Level", "High"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                    {label}
                  </p>
                  <p className="mt-2 text-lg font-medium text-white">{value}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-7 backdrop-blur-md shadow-[0_0_24px_rgba(236,72,153,0.08)]">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-fuchsia-300/70">
            Attack Flow
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            End-to-End Attack Chain
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {attackFlow.map((item) => (
              <article
                key={item.step}
                className="group overflow-hidden rounded-[24px] border border-fuchsia-400/20 bg-black/35 transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.12)]"
              >
                <div className="border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-2.5 py-1 text-[11px] font-mono tracking-[0.25em] text-fuchsia-200">
                      {item.step}
                    </span>
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={1200}
                      height={800}
                      className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/75">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-7 backdrop-blur-md shadow-[0_0_24px_rgba(236,72,153,0.08)]">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-fuchsia-300/70">
              Detection
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Evidence of Compromise
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Network-level evidence showed SMB session activity tied to file
              share access, including session negotiation, tree connect
              requests, and file retrieval. This supported the incident timeline
              and confirmed unauthorized access to the file server.
            </p>

            <div className="mt-6 overflow-hidden rounded-[22px] border border-white/10 bg-black/30">
              <Image
                src="/images/projectimages/boro1/detection.jpg"
                alt="Detection slide showing Wireshark SMB evidence"
                width={1200}
                height={800}
                className="h-auto w-full object-cover"
              />
            </div>
          </article>

          <article className="rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-7 backdrop-blur-md shadow-[0_0_24px_rgba(236,72,153,0.08)]">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-fuchsia-300/70">
              Impact
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              What the Attack Demonstrated
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {impactCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <h3 className="text-base font-medium text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[22px] border border-white/10 bg-black/30">
                <Image
                  src="/images/projectimages/boro1/impact-1.jpg"
                  alt="Impact slide showing SMB share access"
                  width={1200}
                  height={800}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[22px] border border-white/10 bg-black/30">
                <Image
                  src="/images/projectimages/boro1/impact-2.jpg"
                  alt="Impact slide showing exposed internal data"
                  width={1200}
                  height={800}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </article>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-7 backdrop-blur-md shadow-[0_0_24px_rgba(236,72,153,0.08)]">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-fuchsia-300/70">
              Network Layout
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Lab Architecture
            </h2>

            <div className="mt-6 overflow-hidden rounded-[22px] border border-white/10 bg-black/30">
              <Image
                src="/images/projectimages/boro1/network-diagram.jpg"
                alt="Network diagram of the Boro Manufacturing lab"
                width={1200}
                height={800}
                className="h-auto w-full object-cover"
              />
            </div>
          </article>

          <article className="rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-7 backdrop-blur-md shadow-[0_0_24px_rgba(236,72,153,0.08)]">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-fuchsia-300/70">
              Remediation
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Containment and Fixes
            </h2>

            <div className="mt-5 space-y-3">
              {fixes.map((fix) => (
                <div
                  key={fix}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-7 text-white/75"
                >
                  {fix}
                </div>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-[22px] border border-white/10 bg-black/30">
              <Image
                src="/images/projectimages/boro1/vulnerabilities-fixes.jpg"
                alt="Vulnerabilities and fixes slide"
                width={1200}
                height={800}
                className="h-auto w-full object-cover"
              />
            </div>
          </article>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-7 backdrop-blur-md shadow-[0_0_24px_rgba(236,72,153,0.08)]">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-fuchsia-300/70">
              Documentation
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Incident Artifacts
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/75">
              The project included formal incident documentation, including an
              incident response report and a firewall change request tied to
              containment actions.
            </p>

            <div className="mt-6 grid gap-4">
              <a
                href="/images/projectimages/boro1/Boro-Manufacturing-Incident-Response-Report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-fuchsia-400/20 bg-black/30 p-4 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-400/10"
              >
                <p className="text-sm font-medium text-white">
                  Incident Response Report
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Full write-up of the incident, evidence, impact, and risk.
                </p>
              </a>

              <a
                href="/images/projectimages/boro1/Boro-Manufacturing-FCR.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-fuchsia-400/20 bg-black/30 p-4 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-400/10"
              >
                <p className="text-sm font-medium text-white">
                  Firewall Change Request
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Change documentation for containment and SMB blocking.
                </p>
              </a>
            </div>
          </article>

          <article className="rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-7 backdrop-blur-md shadow-[0_0_24px_rgba(236,72,153,0.08)]">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-fuchsia-300/70">
              Takeaways
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Why This Project Matters
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Phishing does not stay isolated for long once valid credentials are captured.",
                "Internal file shares can become pivot points when access control is weak.",
                "Credential exposure can quickly turn a small incident into a larger compromise.",
                "Documentation and containment are just as important as detecting the attack itself.",
              ].map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-7 text-white/75"
                >
                  {point}
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}