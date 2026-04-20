import Link from "next/link";

export default function ExperiencePage() {
  const experiences = [
    {
      title: "Cyber Threat Intelligence Intern",
      company: "New Jersey State Police",
      location: "Ewing, New Jersey",
      date: "September 2025 – December 2025",
      status: "THREAT INTEL",
      points: [
        "Conducted OSINT-based threat analysis to identify potential cyber risks, suspicious activity, and emerging threat patterns.",
        "Supported analysts by documenting findings and assisting with investigation workflows.",
      ],
    },
    {
      title: "Information Security Intern",
      company: "Kyowa Kirin",
      location: "Princeton, New Jersey",
      date: "May 2025 – August 2025",
      status: "SECURITY OPS",
      points: [
        "Investigated 50+ phishing incidents, performing triage, threat validation, and escalation of confirmed security events.",
        "Analyzed CVEs and communicated risk impact and remediation strategies to support vulnerability management efforts.",
        "Planned and coordinated Cybersecurity Awareness Month activities, including guest speaker outreach, internal competitions, and communication campaigns reaching 300+ employees.",
        "Collaborated with IT teams to identify and remediate vulnerabilities across systems.",
        "Led policy and SOP development, rewriting and standardizing documentation for ******* ********.",
        "Supported 20+ third-party risk assessments aligned with NIST CSF, evaluating vendor security posture and compliance risks.",
      ],
    },
    {
      title: "Communication Infrastructure Unit Intern",
      company: "New Jersey State Police",
      location: "West Trenton, New Jersey",
      date: "January 2025 – May 2025",
      status: "INFRASTRUCTURE",
      points: [
        "Configured and deployed 400+ mobile devices supporting statewide communication systems.",
        "Performed system setup, configuration, and troubleshooting to ensure device functionality.",
        "Provided end-user technical support and training during large-scale equipment rollout.",
      ],
    },
    {
      title: "Office of Drug Monitoring and Analysis Intern",
      company: "New Jersey State Police",
      location: "Ewing, New Jersey",
      date: "September 2024 – December 2024",
      status: "ANALYST",
      points: [
        "Assisted analysts in reviewing and organizing datasets used in reports analyzing overdose hotspots and emerging drug trends across New Jersey.",
        "Supported preparation of analytical reports examining patterns in overdose incidents and street-level drug activity.",
        "Conducted research and data analysis to identify regional trends in substance use and distribution patterns.",
      ],
    },
    {
      title: "MIS Supervisor",
      company: "Six Flags Great Adventure",
      location: "Jackson, New Jersey",
      date: "April 2024 – December 2024",
      status: "IT OPS",
      points: [
        "Administered and supported mission-critical POS and ticketing systems in a high-availability environment supporting three parks and thousands of daily guests.",
        "Maintained park IT infrastructure including servers, endpoints, and dozens of networked devices, performing troubleshooting, patching, and outage response under strict operational time constraints.",
        "Managed Active Directory accounts and access controls, enforcing least privilege and secure authentication practices.",
        "Assisted with network infrastructure deployment for the Six Flags Safari Resort, supporting connectivity for operational systems and guest services.",
        "Provided technical support across multiple departments and operational teams, resolving issues affecting critical business systems and sensitive operational data.",
        "Responded to a large-scale system outage impacting 300+ endpoints, performing rapid troubleshooting and system recovery under time constraints.",
      ],
    },
    {
      title: "IT Help Desk Technician",
      company: "Mercer County Community College",
      location: "West Windsor, New Jersey",
      date: "September 2022 – May 2023",
      status: "HELPDESK",
      points: [
        "Supported 1000+ students, faculty, and staff in a hybrid environment, providing in-person and remote troubleshooting for Windows 10/11 and macOS systems.",
        "Resolved 15+ helpdesk tickets daily involving hardware repairs, software installation, and network connectivity issues.",
      ],
    },
  ];

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
            Career Timeline
          </div>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Experience
          </h1>

          <p className="mt-4 max-w-4xl text-base leading-7 text-white/70 md:text-lg">
            My background spans IT support, infrastructure, enterprise security, and cyber threat intelligence. Together, these roles have built the technical and analytical foundation behind the work I do today.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              "Cybersecurity Internships",
              "Government Experience",
              "Enterprise Security Work",
              "Infrastructure + IT Foundations",
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
          <div className="absolute left-[15px] top-0 hidden h-full w-px bg-gradient-to-b from-fuchsia-400/60 via-fuchsia-400/20 to-transparent md:block" />

          <div className="space-y-8">
            {experiences.map((job, index) => (
              <article
                key={`${job.company}-${job.title}`}
                className="group relative md:pl-14"
              >
                <div className="absolute left-0 top-8 hidden h-8 w-8 items-center justify-center rounded-full border border-fuchsia-400/40 bg-black shadow-[0_0_18px_rgba(236,72,153,0.35)] md:flex">
                  <div className="h-2.5 w-2.5 rounded-full bg-fuchsia-300" />
                </div>

                <div className="rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-6 backdrop-blur-md transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.12)] md:p-7">
                  <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="mb-2 inline-flex items-center rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-fuchsia-200">
                        {job.status}
                      </div>

                      <h2 className="text-2xl font-semibold text-white">
                        {job.title}
                      </h2>

                      <p className="mt-1 text-sm text-fuchsia-200/90">
                        {job.company} • {job.location}
                      </p>
                    </div>

                    <div className="text-sm font-mono uppercase tracking-wider text-white/45">
                      {job.date}
                    </div>
                  </div>

                  <ul className="space-y-3 text-sm leading-7 text-white/75 md:text-[15px]">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-300" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 border-t border-white/10 pt-4 text-xs font-mono uppercase tracking-[0.2em] text-white/35">
                    Node {String(experiences.length - index).padStart(2, "0")} / Career Pathway
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="education"
          className="mb-12 relative overflow-hidden rounded-[28px] border border-fuchsia-400/20 bg-black/50 p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(236,72,153,0.08)] md:p-10"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-fuchsia-200">
            Academic Background
          </div>

          <h2 className="mb-6 text-2xl font-semibold">
            Education
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl border border-fuchsia-400/20 bg-black/40 p-6 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.08)] transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.14)]">
              <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="pointer-events-none absolute -left-12 top-0 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 rounded-full bg-fuchsia-400/10 blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-lg font-semibold">
                  Rider University
                </h3>

                <p className="mb-2 text-sm text-fuchsia-300">
                  Bachelor of Science in Cybersecurity
                </p>

                <p className="text-sm text-white/70">
                  Expected May 2026
                </p>

                <p className="mt-2 text-sm text-white/60">
                  GPA: 3.84 • Dean’s List (all semesters)
                </p>

                <p className="mt-3 text-sm text-white/60">
                  Focus Areas: Network Defense • Digital Forensics • Cyber Threat Intelligence • Security Research
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-fuchsia-400/20 bg-black/40 p-6 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.08)] transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.14)]">
              <h3 className="text-lg font-semibold">
                Mercer County Community College
              </h3>

              <p className="mb-2 text-sm text-fuchsia-300">
                Associate of Science in Computer Information Systems (Honors)
              </p>

              <p className="text-sm text-white/70">
                Graduated May 2024
              </p>

              <p className="mt-3 text-sm text-white/60">
                Focus Areas: Systems Administration • Networking Fundamentals • IT Support & Troubleshooting • Information Systems Foundations
              </p>
            </div>
          </div>
        </section>

        <section
          id="leadership"
          className="scroll-mt-28 mb-12 relative overflow-hidden rounded-[28px] border border-fuchsia-400/20 bg-black/50 p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(236,72,153,0.08)] md:p-10"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-fuchsia-400/10 blur-3xl" />

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-fuchsia-200">
  Leadership
          </div>
          <div className="relative z-10">
            <h2 className="mb-8 text-2xl font-semibold">
              Leadership & Campus Involvement
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-fuchsia-400/20 bg-black/40 p-5 backdrop-blur-md shadow-[0_0_18px_rgba(236,72,153,0.08)] transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_28px_rgba(236,72,153,0.14)]">
                <h3 className="text-lg font-semibold">
                  Treasurer — CybHer (WiCyS Student Chapter)
                </h3>
                <p className="text-sm text-white/60">
                  Rider University • 2025 – Present
                </p>
              </div>

              <div className="rounded-2xl border border-fuchsia-400/20 bg-black/40 p-5 backdrop-blur-md shadow-[0_0_18px_rgba(236,72,153,0.08)] transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_28px_rgba(236,72,153,0.14)]">
                <h3 className="text-lg font-semibold">
                  Vice President — Latin American Student Organization
                </h3>
                <p className="text-sm text-white/60">
                  Rider University • 2025 – Present
                </p>
              </div>

              <div className="rounded-2xl border border-fuchsia-400/20 bg-black/40 p-5 backdrop-blur-md shadow-[0_0_18px_rgba(236,72,153,0.08)] transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_28px_rgba(236,72,153,0.14)]">
                <h3 className="text-lg font-semibold">
                  Member at Large — Student Government Association
                </h3>
                <p className="text-sm text-white/60">
                  Rider University • 2025
                </p>
              </div>

              <div className="rounded-2xl border border-fuchsia-400/20 bg-black/40 p-5 backdrop-blur-md shadow-[0_0_18px_rgba(236,72,153,0.08)] transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_28px_rgba(236,72,153,0.14)]">
                <h3 className="text-lg font-semibold">
                  Alumni Trustee — Board of Trustees
                </h3>
                <p className="text-sm text-white/60">
                  Mercer County Community College • 2024 – 2025
                </p>
              </div>

              <div className="rounded-2xl border border-fuchsia-400/20 bg-black/40 p-5 backdrop-blur-md shadow-[0_0_18px_rgba(236,72,153,0.08)] transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_28px_rgba(236,72,153,0.14)]">
                <h3 className="text-lg font-semibold">
                  President — IT & Cybersecurity Club
                </h3>
                <p className="text-sm text-white/60">
                  Mercer County Community College • 2023 – 2024
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}