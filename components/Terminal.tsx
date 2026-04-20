"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const MAX_INPUT = 24;

type OutputLine = {
  text: string;
  variant?: "default" | "secret";
};

function sanitizeCommand(value: string) {
  return value
    .replace(/[<>]/g, "")
    .replace(/[^a-zA-Z0-9\s\-_]/g, "")
    .slice(0, MAX_INPUT);
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<OutputLine[]>([]);
  const router = useRouter();

  function handleCommand(command: string) {
    const cmd = sanitizeCommand(command).toLowerCase().trim();

    if (!cmd) return;

    const routes: Record<string, string> = {
      projects: "/projects",
      experience: "/experience",
      contact: "/contact",
      education: "/experience#education",
      leadership: "/experience#leadership",
      minitools: "/minitools",
      whoami: "/whoami",
    };

    if (cmd === "help") {
      setOutput((prev) => [
        ...prev,
        { text: "> help" },
        { text: "Available commands:" },
        { text: "contact" },
        { text: "experience" },
        { text: "projects" },
        { text: "education" },
        { text: "leadership" },
        { text: "minitools" },
        { text: "???", variant: "secret" },
      ]);
      return;
    }

    if (routes[cmd]) {
      router.push(routes[cmd]);
      return;
    }

    setOutput((prev) => [
      ...prev,
      { text: `> ${cmd}` },
      { text: `Command not found: ${cmd}` },
    ]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  }

  return (
    <div className="rounded-2xl border border-fuchsia-400/20 bg-black/60 p-4 font-mono text-sm text-fuchsia-300 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.08)] transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.14)]">
      <div className="mb-2 space-y-1">
        {output.map((line, i) =>
          line.variant === "secret" ? (
            <div
              key={i}
              className="group w-fit cursor-help text-fuchsia-200"
              title="some commands are not documented"
            >
              <span className="secret-command inline-block transition duration-200 group-hover:hidden">
                ???
              </span>
              <span className="hidden text-fuchsia-300 drop-shadow-[0_0_10px_rgba(236,72,153,0.95)] group-hover:inline-block">
                whoami
              </span>
            </div>
          ) : (
            <div
              key={i}
              className="text-fuchsia-300 drop-shadow-[0_0_6px_rgba(236,72,153,0.6)]"
            >
              {line.text}
            </div>
          )
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
        <span>{">"}</span>
        <input
          className="flex-1 bg-transparent outline-none placeholder:text-white/30"
          value={input}
          onChange={(e) => setInput(sanitizeCommand(e.target.value))}
          maxLength={MAX_INPUT}
          autoComplete="off"
          spellCheck={false}
          placeholder="type a command..."
          aria-label="Terminal command input"
        />
        <span className="text-xs text-white/35">
          {input.length}/{MAX_INPUT}
        </span>
      </form>
    </div>
  );
}