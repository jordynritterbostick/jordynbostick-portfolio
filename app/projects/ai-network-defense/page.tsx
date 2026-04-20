import Image from "next/image";
import Link from "next/link";

export default function AINetworkDefensePage() {
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
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="relative z-10">
            <h1 className="text-4xl font-semibold md:text-5xl">
              AI-Assisted Network Defense
            </h1>

            <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
              <span className="rounded border border-fuchsia-400/30 px-2 py-1 text-fuchsia-300">
                LLMs
              </span>
              <span className="rounded border border-fuchsia-400/30 px-2 py-1 text-fuchsia-300">
                Network Traffic Analysis
              </span>
              <span className="rounded border border-fuchsia-400/30 px-2 py-1 text-fuchsia-300">
                Threat Detection
              </span>
              <span className="rounded border border-fuchsia-400/30 px-2 py-1 text-fuchsia-300">
                Packet Analysis
              </span>
              <span className="rounded border border-fuchsia-400/30 px-2 py-1 text-fuchsia-300">
                Machine Learning
              </span>
            </div>

            <p className="mt-4 max-w-3xl leading-7 text-white/75">
              A group networking project focused on how AI and LLM-based tools can
              support defensive cyber analysis by helping identify suspicious
              traffic patterns, highlight possible attack indicators, and improve
              the speed of network-based threat detection.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/50 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.12)] transition duration-300 hover:border-fuchsia-300/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.20)]">
            <h2 className="mb-3 text-xl font-semibold">Project Details</h2>
            <ul className="space-y-2 text-white/75">
              <li>
                <strong>Course:</strong> CYB 260 Network Defenses and Countermeasures
              </li>
              <li>
                <strong>Type:</strong> Group term project
              </li>
              <li>
                <strong>Team Members:</strong> Christina Alli, Samantha Betancourt,
                Vanessa Reino
              </li>
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/50 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.12)] transition duration-300 hover:border-fuchsia-300/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.20)]">
            <h2 className="mb-3 text-xl font-semibold">Tools / Topics</h2>
            <p className="leading-7 text-white/75">
              Machine learning, LLM-assisted analysis, network traffic inspection,
              packet analysis, anomaly detection, defensive security workflows,
              and evaluating how AI can assist analysts in recognizing suspicious
              behavior in network environments.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/50 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.12)] transition duration-300 hover:border-fuchsia-300/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.20)]">
          <h2 className="mb-3 text-2xl font-semibold">Overview</h2>
          <p className="leading-7 text-white/75">
            This project explored how artificial intelligence can be used as a
            support tool in network defense. Instead of treating AI as a full
            replacement for analysts, the project focused on how it can assist
            with identifying malicious traffic patterns, recognizing unusual
            behavior, and helping defenders interpret network activity more
            efficiently. The overall goal was to better understand both the value
            and the limitations of AI when applied to real defensive security work.
          </p>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/50 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.12)] transition duration-300 hover:border-fuchsia-300/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.20)]">
          <h2 className="mb-3 text-2xl font-semibold">Methodology</h2>
          <p className="leading-7 text-white/75">
            Our team examined how AI-driven approaches could be applied to
            network traffic analysis by comparing how well they could identify
            patterns associated with suspicious or malicious behavior. The
            project centered on reviewing traffic characteristics, considering
            how machine learning models interpret data, and analyzing where LLMs
            and AI tools may provide useful context during defensive
            investigations. We also looked at the practical side of using AI in
            security, including the importance of human review and the risk of
            false positives.
          </p>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/50 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.12)] transition duration-300 hover:border-fuchsia-300/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.20)]">
          <h2 className="mb-3 text-2xl font-semibold">Results & Detection Performance</h2>

          <p className="leading-7 text-white/75">
            The model demonstrated strong detection capability when identifying malicious
            traffic patterns, successfully detecting all attack samples in the dataset.
            However, this came with a tradeoff — a noticeable number of false positives,
            where normal traffic was incorrectly flagged as malicious.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <h3 className="text-lg font-semibold text-white">Key Metrics</h3>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/40">Total Packets</p>
                  <p className="font-medium text-white">~1100</p>
                </div>
                <div>
                  <p className="text-white/40">Anomalies</p>
                  <p className="font-medium text-white">800</p>
                </div>
                <div>
                  <p className="text-white/40">True Positives</p>
                  <p className="font-medium text-white">28</p>
                </div>
                <div>
                  <p className="text-white/40">False Positives</p>
                  <p className="font-medium text-white">16</p>
                </div>
                <div>
                  <p className="text-white/40">False Negatives</p>
                  <p className="font-medium text-white">0</p>
                </div>
                <div>
                  <p className="text-white/40">True Negatives</p>
                  <p className="font-medium text-white">0</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <h3 className="text-lg font-semibold text-white">Confusion Matrix</h3>

              <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/images/projectimages/ainetdef/confusion-matrix.jpg"
                  alt="Confusion matrix showing model detection performance"
                  width={1200}
                  height={800}
                  className="w-full object-cover"
                />
              </div>

              <p className="mt-4 text-sm leading-7 text-white/70">
                The confusion matrix shows that the model achieved zero false negatives,
                meaning it successfully identified all attack samples. However, the
                presence of false positives highlights a key limitation — the model can
                be overly sensitive and may flag benign traffic as suspicious.
              </p>
            </div>
          </div>

          <div className="mt-6 text-sm leading-7 text-white/70">
            Overall, these results show that the model is highly effective at detecting
            threats, but requires further tuning to reduce unnecessary alerts and improve
            precision in real-world environments.
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/50 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.12)] transition duration-300 hover:border-fuchsia-300/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.20)]">
          <h2 className="mb-3 text-2xl font-semibold">Key Findings</h2>
          <div className="space-y-4 text-white/75">
            <p className="leading-7">
              AI can be useful for recognizing suspicious traffic trends and
              helping surface patterns that may deserve closer review, especially
              when dealing with large amounts of network data.
            </p>
            <p className="leading-7">
              At the same time, the project showed that AI is most effective when
              used as an assistant rather than as a decision-maker. Context still
              matters, and analyst judgment is necessary to verify whether
              flagged activity is truly malicious or simply unusual but harmless.
            </p>
            <p className="leading-7">
              One of the biggest takeaways was that AI has strong potential in
              defensive workflows, but its usefulness depends on the quality of
              the data, the clarity of the patterns being analyzed, and the
              ability of defenders to validate the results.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}