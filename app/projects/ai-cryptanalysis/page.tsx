import Image from "next/image";
import Link from "next/link";

export default function AICryptanalysisPage() {
  return (
    <main className="relative z-10 min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl space-y-10">
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

        <section className="rounded-[30px] border border-fuchsia-400/20 bg-black/50 p-8 backdrop-blur-xl">
          <h1 className="text-4xl font-semibold md:text-6xl">
            AI-Assisted Cryptanalysis
            <span className="block text-fuchsia-300">
              Capabilities & Limits
            </span>
          </h1>

          <p className="mt-5 max-w-3xl leading-7 text-white/75">
            This project explores how machine learning can be used to break
            classical encryption by learning statistical patterns in ciphertext.
            Using the Vigenère cipher, I tested how increasing key length impacts
            model accuracy and demonstrates where AI-based cryptanalysis begins
            to fail.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/50 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.12)] transition duration-300 hover:border-fuchsia-300/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.20)]">
            <h2 className="mb-3 text-xl font-semibold">Project Details</h2>

            <ul className="space-y-2 text-white/75">
              <li>
                <strong>Course:</strong> CSC 340 Cybersecurity Essentials
              </li>
              <li>
                <strong>Type:</strong> Group term project
              </li>
              <li>
                <strong>Team Members:</strong> Ryan Convery, Marissa Greeley, Vanessa Reino
              </li>
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-black/50 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.12)] transition duration-300 hover:border-fuchsia-300/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.20)]">
            <h2 className="mb-3 text-xl font-semibold">Tools Used</h2>

            <p className="leading-7 text-white/75">
              Python for model development, machine learning libraries for training
              and evaluation, and custom scripts for generating Vigenère-encrypted
              datasets with varying key lengths to analyze model performance.
            </p>
          </div>
        </section>

        <section className="rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-7">
          <h2 className="text-2xl font-semibold">Background</h2>

          <p className="mt-4 leading-7 text-white/75">
            Classical ciphers like Vigenère expose repeating frequency patterns
            that can be learned and exploited. This makes them a good candidate
            for testing AI-based attacks. In contrast, modern cryptographic
            systems such as AES and post-quantum algorithms are designed to
            eliminate these patterns entirely.
          </p>
        </section>

        <section className="rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-7">
          <h2 className="text-2xl font-semibold">Methodology</h2>

          <p className="mt-4 leading-7 text-white/75">
            A machine learning model was trained on Vigenère-encrypted text using
            randomly generated keys. The model learned frequency-based patterns
            in ciphertext and attempted to predict the encryption key.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>• Cipher: Vigenère</li>
            <li>• Dataset sizes: 1,000 → 20,000 samples</li>
            <li>• Key lengths tested: 3, 4, 6</li>
            <li>• Goal: Evaluate how complexity affects prediction accuracy</li>
          </ul>
        </section>

        <section className="rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-7">
          <h2 className="text-2xl font-semibold">
            How Key Length Breaks AI-Based Cryptanalysis
          </h2>

          <p className="mt-4 max-w-4xl leading-7 text-white/75">
            To test how cipher complexity affects model performance, the AI was
            evaluated against ciphertexts with increasing key lengths. As key
            length increased, prediction accuracy decreased significantly,
            showing that the model struggled as statistical patterns became less
            predictable.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <h3 className="text-sm font-medium">Key Length 3</h3>
              <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/images/projectimages/aicrypt/keylen-3.jpg"
                  alt="Model performance visualization for Vigenère key length 3"
                  width={800}
                  height={600}
                  className="w-full"
                />
              </div>
              <p className="mt-3 text-xs text-white/60">
                High accuracy due to strong repeating patterns.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <h3 className="text-sm font-medium">Key Length 4</h3>
              <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/images/projectimages/aicrypt/keylen-4.jpg"
                  alt="Model performance visualization for Vigenère key length 4"
                  width={800}
                  height={600}
                  className="w-full"
                />
              </div>
              <p className="mt-3 text-xs text-white/60">
                Accuracy begins to decline as patterns become less obvious.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <h3 className="text-sm font-medium">Key Length 6</h3>
              <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/images/projectimages/aicrypt/keylen-6.jpg"
                  alt="Model performance visualization for Vigenère key length 6"
                  width={800}
                  height={600}
                  className="w-full"
                />
              </div>
              <p className="mt-3 text-xs text-white/60">
                Accuracy drops to ~17–21%, showing clear limitations.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5">
            <h3 className="text-sm font-medium">Key Insight</h3>
            <p className="mt-2 text-sm leading-7 text-white/70">
              The model relies on detectable statistical structure. As key length
              increases, those patterns weaken, making prediction significantly
              harder. This demonstrates why AI-based attacks do not scale well to
              stronger encryption.
            </p>
          </div>
        </section>

        <section className="rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-7">
          <h2 className="text-2xl font-semibold">Results & Analysis</h2>

          <p className="mt-4 leading-7 text-white/75">
            The model performed better with larger datasets, showing improved
            training efficiency and lower loss. However, increasing key length
            had a stronger negative impact on accuracy than dataset size had on
            improvement.
          </p>
        </section>

        <section className="rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-7">
          <h2 className="text-2xl font-semibold">Limitations</h2>

          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>• Vigenère is a simplified cipher with predictable structure</li>
            <li>• Dataset was synthetic and uniform</li>
            <li>• Results do not directly scale to modern encryption</li>
          </ul>
        </section>

        <section className="rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-7">
          <h2 className="text-2xl font-semibold">Key Takeaways</h2>

          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>• AI works when patterns exist</li>
            <li>• Strong encryption removes those patterns</li>
            <li>• Key length significantly impacts attack success</li>
            <li>• AI is more effective in side-channel scenarios than direct decryption</li>
          </ul>
        </section>
      </div>
    </main>
  );
}