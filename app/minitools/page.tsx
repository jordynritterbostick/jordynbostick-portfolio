"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import * as exifr from "exifr";

type BrowserCheck = {
  label: string;
  status: "good" | "warning" | "info";
  message: string;
};

type DisplayMetadata = {
  camera: string | null;
  dateTaken: string | null;
  gps: string | null;
};

type URLFinding = {
  level: "low" | "medium" | "high" | "info";
  text: string;
};

async function sha256Hex(input: string | ArrayBuffer): Promise<string> {
  const data =
    typeof input === "string" ? new TextEncoder().encode(input) : input;

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function scorePassword(password: string) {
  const checks = {
    length12: password.length >= 12,
    length16: password.length >= 16,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
    noCommon:
      !/password|123456|qwerty|letmein|admin|welcome|iloveyou|abc123/i.test(
        password
      ),
    noRepeats: !/(.)\1{2,}/.test(password),
  };

  let score = 0;
  if (checks.length12) score += 1;
  if (checks.length16) score += 1;
  if (checks.upper) score += 1;
  if (checks.lower) score += 1;
  if (checks.number) score += 1;
  if (checks.symbol) score += 1;
  if (checks.noCommon) score += 1;
  if (checks.noRepeats) score += 1;

  let label = "Very Weak";
  let severity: "low" | "medium" | "high" | "info" = "high";

  if (!password) {
    label = "No Input";
    severity = "info";
  } else if (score >= 7) {
    label = "Strong";
    severity = "low";
  } else if (score >= 5) {
    label = "Moderate";
    severity = "medium";
  } else if (score >= 3) {
    label = "Weak";
    severity = "high";
  }

  return {
    score: Math.min(score, 8),
    label,
    severity,
    checks,
  };
}

function formatExifDate(value: unknown) {
  if (!value) return null;

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toLocaleString();
  }

  if (typeof value === "string") return value;

  return null;
}

function formatMetadata(
  data: Record<string, unknown> | null
): DisplayMetadata | null {
  if (!data) return null;

  const make = typeof data.Make === "string" ? data.Make : null;
  const model = typeof data.Model === "string" ? data.Model : null;

  const latitude =
    typeof data.latitude === "number"
      ? data.latitude
      : typeof data.Latitude === "number"
      ? data.Latitude
      : null;

  const longitude =
    typeof data.longitude === "number"
      ? data.longitude
      : typeof data.Longitude === "number"
      ? data.Longitude
      : null;

  const gps =
    latitude !== null && longitude !== null
      ? `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
      : null;

  const dateTaken =
    formatExifDate(data.DateTimeOriginal) ||
    formatExifDate(data.CreateDate) ||
    formatExifDate(data.ModifyDate);

  const camera = make && model ? `${make} ${model}` : model || make || null;
  const hasAnything = camera || dateTaken || gps;

  if (!hasAnything) return null;

  return {
    camera,
    dateTaken,
    gps,
  };
}

function analyzeURL(raw: string): URLFinding[] {
  const findings: URLFinding[] = [];

  if (!raw.trim()) {
    return [{ level: "info", text: "Enter a URL to analyze." }];
  }

  if (raw.length > 500) {
    return [
      {
        level: "high",
        text: "Input too long. URL analysis is capped at 500 characters.",
      },
    ];
  }

  try {
    const url = new URL(raw);
    const hostname = url.hostname;

    if (url.protocol !== "https:") {
      findings.push({
        level: "high",
        text: "URL does not use HTTPS.",
      });
    } else {
      findings.push({
        level: "info",
        text: "HTTPS detected.",
      });
    }

    if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
      findings.push({
        level: "high",
        text: "URL uses a raw IP address instead of a normal domain.",
      });
    }

    if (raw.length > 75) {
      findings.push({
        level: "medium",
        text: "URL is unusually long.",
      });
    }

    if (/login|verify|secure|update|account|confirm|reset/i.test(raw)) {
      findings.push({
        level: "medium",
        text: "Contains keywords commonly seen in phishing lures.",
      });
    }

    if (hostname.split(".").length > 4) {
      findings.push({
        level: "medium",
        text: "Domain has many subdomain levels.",
      });
    }

    if (hostname.includes("--")) {
      findings.push({
        level: "medium",
        text: "Hostname contains repeated hyphens, which can be suspicious.",
      });
    }

    if (hostname.startsWith("xn--")) {
      findings.push({
        level: "high",
        text: "Punycode detected. This can be used in lookalike domains.",
      });
    }

    if (url.username || url.password) {
      findings.push({
        level: "high",
        text: "URL contains embedded credentials.",
      });
    }

    if (
      !findings.some((item) => item.level === "high" || item.level === "medium")
    ) {
      findings.push({
        level: "low",
        text: "No obvious phishing indicators found from local rule-based analysis.",
      });
    }

    return findings;
  } catch {
    return [{ level: "high", text: "Invalid URL format." }];
  }
}

function levelClasses(level: "low" | "medium" | "high" | "info") {
  if (level === "high") {
    return "border-rose-500/30 bg-rose-500/10 text-rose-300";
  }
  if (level === "medium") {
    return "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
  }
  if (level === "low") {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
  }
  return "border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-200";
}

export default function ToolsPage() {
  const [password, setPassword] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [hashError, setHashError] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [cleanedBlobUrl, setCleanedBlobUrl] = useState<string | null>(null);
  const [cleanedFileName, setCleanedFileName] = useState("cleaned-image.png");
  const [scrubStatus, setScrubStatus] = useState("No file processed yet.");
  const [metadata, setMetadata] = useState<DisplayMetadata | null>(null);
  const [metadataStatus, setMetadataStatus] = useState(
    "Upload an image to inspect its metadata."
  );

  const [fileHash, setFileHash] = useState("");
  const [fileHashName, setFileHashName] = useState("");
  const [fileHashStatus, setFileHashStatus] = useState(
    "Select a file to generate a SHA-256 hash locally."
  );

  const [urlInput, setUrlInput] = useState("");
  const [urlFindings, setUrlFindings] = useState<URLFinding[]>([
    { level: "info", text: "Enter a URL to analyze." },
  ]);

  const [browserChecks, setBrowserChecks] = useState<BrowserCheck[]>([]);

  const passwordResult = useMemo(() => scorePassword(password), [password]);
  const passwordBarWidth = `${(passwordResult.score / 8) * 100}%`;

  const passwordChecks: { label: string; value: boolean }[] = [
    { label: "12+ characters", value: passwordResult.checks.length12 },
    { label: "16+ characters", value: passwordResult.checks.length16 },
    { label: "Uppercase", value: passwordResult.checks.upper },
    { label: "Lowercase", value: passwordResult.checks.lower },
    { label: "Number", value: passwordResult.checks.number },
    { label: "Symbol", value: passwordResult.checks.symbol },
    { label: "Avoids common patterns", value: passwordResult.checks.noCommon },
    { label: "No repeated characters", value: passwordResult.checks.noRepeats },
  ];

  const metadataHasGPS = Boolean(metadata?.gps);
  const highURLCount = urlFindings.filter((item) => item.level === "high").length;
  const mediumURLCount = urlFindings.filter((item) => item.level === "medium").length;

  const alertFeed = [
    password && passwordResult.severity === "high"
      ? {
          level: "high" as const,
          text: `Weak password detected: ${passwordResult.label}`,
        }
      : null,
    metadataHasGPS
      ? {
          level: "high" as const,
          text: "Image metadata includes GPS coordinates.",
        }
      : metadata
      ? { level: "medium" as const, text: "Image contains metadata." }
      : null,
    fileHash
      ? { level: "low" as const, text: "File hash generated successfully." }
      : null,
    highURLCount > 0
      ? {
          level: "high" as const,
          text: `URL analysis found ${highURLCount} high-risk indicator(s).`,
        }
      : mediumURLCount > 0
      ? {
          level: "medium" as const,
          text: `URL analysis found ${mediumURLCount} medium-risk indicator(s).`,
        }
      : urlInput
      ? {
          level: "low" as const,
          text: "URL analysis found no obvious high-risk indicators.",
        }
      : null,
    browserChecks.some((item) => item.status === "warning")
      ? {
          level: "medium" as const,
          text: "Browser snapshot contains warning-level findings.",
        }
      : { level: "low" as const, text: "Browser snapshot looks normal." },
  ].filter(Boolean) as { level: "low" | "medium" | "high"; text: string }[];

  useEffect(() => {
    let cancelled = false;

    const runHash = async () => {
      setHashError("");

      if (!password) {
        setPasswordHash("");
        return;
      }

      try {
        if (!window.isSecureContext || !window.crypto?.subtle) {
          setPasswordHash("");
          setHashError("Secure hashing unavailable.");
          return;
        }

        const hash = await sha256Hex(password);

        if (!cancelled) {
          setPasswordHash(hash);
        }
      } catch {
        if (!cancelled) {
          setPasswordHash("");
          setHashError("Error generating hash.");
        }
      }
    };

    void runHash();

    return () => {
      cancelled = true;
    };
  }, [password]);

  useEffect(() => {
    const checks: BrowserCheck[] = [];

    checks.push({
      label: "Secure Context",
      status: window.isSecureContext ? "good" : "warning",
      message: window.isSecureContext
        ? "This page is running in a secure context (HTTPS or localhost)."
        : "This page is not running in a secure context.",
    });

    checks.push({
      label: "Cookies Enabled",
      status: navigator.cookieEnabled ? "info" : "warning",
      message: navigator.cookieEnabled
        ? "Cookies are enabled in this browser."
        : "Cookies appear to be disabled in this browser.",
    });

    const doNotTrack =
      navigator.doNotTrack ||
      // @ts-expect-error browser compatibility
      window.doNotTrack ||
      // @ts-expect-error browser compatibility
      navigator.msDoNotTrack;

    checks.push({
      label: "Do Not Track",
      status: doNotTrack === "1" ? "good" : "info",
      message:
        doNotTrack === "1"
          ? "Do Not Track is enabled."
          : "Do Not Track is not enabled.",
    });

    checks.push({
      label: "Clipboard API",
      status: navigator.clipboard ? "info" : "warning",
      message: navigator.clipboard
        ? "Clipboard API is available in this browser."
        : "Clipboard API is not available in this browser.",
    });

    checks.push({
      label: "Cross-Origin Isolation",
      status: window.crossOriginIsolated ? "good" : "info",
      message: window.crossOriginIsolated
        ? "This page is cross-origin isolated."
        : "This page is not cross-origin isolated.",
    });

    checks.push({
      label: "Online Status",
      status: navigator.onLine ? "good" : "warning",
      message: navigator.onLine
        ? "Browser reports an active network connection."
        : "Browser reports you are offline.",
    });

    setBrowserChecks(checks);
  }, []);

  useEffect(() => {
    return () => {
      if (originalPreview) URL.revokeObjectURL(originalPreview);
      if (cleanedBlobUrl) URL.revokeObjectURL(cleanedBlobUrl);
    };
  }, [originalPreview, cleanedBlobUrl]);

  const resetImageState = () => {
    if (originalPreview) URL.revokeObjectURL(originalPreview);
    if (cleanedBlobUrl) URL.revokeObjectURL(cleanedBlobUrl);

    setSelectedFile(null);
    setOriginalPreview(null);
    setCleanedBlobUrl(null);
    setCleanedFileName("cleaned-image.png");
    setMetadata(null);
    setMetadataStatus("Upload an image to inspect its metadata.");
  };

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      resetImageState();
      setScrubStatus("Please upload a JPG, PNG, or WEBP image only.");
      return;
    }

    if (file.size > maxSize) {
      resetImageState();
      setScrubStatus("Please upload an image under 10MB.");
      return;
    }

    if (originalPreview) URL.revokeObjectURL(originalPreview);
    if (cleanedBlobUrl) URL.revokeObjectURL(cleanedBlobUrl);

    const previewUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setOriginalPreview(previewUrl);
    setCleanedBlobUrl(null);
    setScrubStatus(
      "Image loaded locally. Click “Strip Metadata” to export a cleaned copy."
    );
    setMetadata(null);
    setMetadataStatus("Checking image for metadata...");
    setCleanedFileName(`${file.name.replace(/\.[^/.]+$/, "")}-scrubbed.png`);

    try {
      const parsed = await exifr.parse(file);
      const cleanMetadata = formatMetadata(
        parsed as Record<string, unknown> | null
      );

      if (cleanMetadata) {
        setMetadata(cleanMetadata);
        setMetadataStatus("Metadata detected in the uploaded image.");
      } else {
        setMetadata(null);
        setMetadataStatus("No EXIF metadata detected in this image.");
      }
    } catch {
      setMetadata(null);
      setMetadataStatus("Could not read metadata from this image.");
    }
  };

  const scrubMetadata = async () => {
    if (!selectedFile) {
      setScrubStatus("Please upload an image first.");
      return;
    }

    setScrubStatus("Processing image locally in your browser...");

    const imageUrl = URL.createObjectURL(selectedFile);
    const img = new Image();

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setScrubStatus("Could not access canvas context.");
          URL.revokeObjectURL(imageUrl);
          return;
        }

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(imageUrl);

            if (!blob) {
              setScrubStatus("Could not export cleaned image.");
              return;
            }

            if (cleanedBlobUrl) URL.revokeObjectURL(cleanedBlobUrl);

            const newBlobUrl = URL.createObjectURL(blob);
            setCleanedBlobUrl(newBlobUrl);
            setScrubStatus(
              "Done. A cleaned copy was created locally without the original EXIF metadata."
            );
          },
          "image/png",
          1
        );
      } catch {
        URL.revokeObjectURL(imageUrl);
        setScrubStatus("Something went wrong while cleaning the image.");
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      setScrubStatus("Could not read that image.");
    };

    img.src = imageUrl;
  };

  const handleHashFile = async (file: File | null) => {
    if (!file) return;

    const maxSize = 20 * 1024 * 1024;

    if (file.size > maxSize) {
      setFileHash("");
      setFileHashName("");
      setFileHashStatus("Please select a file under 20MB.");
      return;
    }

    try {
      setFileHash("");
      setFileHashName(file.name);
      setFileHashStatus("Generating SHA-256 hash locally...");

      const buffer = await file.arrayBuffer();
      const hash = await sha256Hex(buffer);

      setFileHash(hash);
      setFileHashStatus("SHA-256 hash generated successfully.");
    } catch {
      setFileHash("");
      setFileHashName("");
      setFileHashStatus("Could not hash that file.");
    }
  };

  const runURLCheck = () => {
    setUrlFindings(analyzeURL(urlInput.trim()));
  };

  return (
    <main className="relative z-10 min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl space-y-10">
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

        <section className="relative mb-12 rounded-[28px] border border-fuchsia-400/20 bg-black/50 p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(236,72,153,0.08)] md:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-fuchsia-200">
              Tools Node
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Tools Dashboard
            </h1>

            <p className="mt-4 max-w-4xl text-base leading-8 text-white/70 md:text-lg">
              A SIEM-inspired collection of small privacy, browser security, and
              threat-analysis tools built to run locally in the browser.
            </p>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Modules",
              value: "5",
              status: "ACTIVE",
            },
            {
              label: "High Alerts",
              value: String(
                alertFeed.filter((item) => item.level === "high").length
              ),
              status: "PRIORITY",
            },
            {
              label: "Medium Alerts",
              value: String(
                alertFeed.filter((item) => item.level === "medium").length
              ),
              status: "REVIEW",
            },
            {
              label: "Processing",
              value: "LOCAL",
              status: "SAFE MODE",
            },
          ].map((item, index) => (
            <div
              key={item.label}
              className="group relative overflow-hidden rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-6 backdrop-blur-md transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.12)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />

              <div className="relative z-10">
                <div className="mb-3 inline-flex items-center rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-fuchsia-200">
                  {item.status}
                </div>

                <h2 className="text-sm uppercase tracking-[0.2em] text-white/45">
                  {item.label}
                </h2>

                <p className="mt-3 text-4xl font-semibold text-white">
                  {item.value}
                </p>

                <div className="mt-6 border-t border-white/10 pt-4 text-xs font-mono uppercase tracking-[0.2em] text-white/35">
                  Node {String(index + 1).padStart(2, "0")} / Dashboard Metric
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="relative rounded-[28px] border border-fuchsia-400/20 bg-black/45 p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(236,72,153,0.08)]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-fuchsia-200">
              Alert Feed
            </div>

            <h2 className="text-3xl font-semibold text-white">
              Current Findings
            </h2>

            <div className="mt-6 grid gap-3">
              {alertFeed.map((alert, index) => (
                <div
                  key={`${alert.text}-${index}`}
                  className={`rounded-2xl border px-4 py-3 text-sm ${levelClasses(alert.level)}`}
                >
                  {alert.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-8 xl:grid-cols-2">
          <div className="group relative overflow-hidden rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-6 backdrop-blur-md transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.12)]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="relative z-10">
              <div className="mb-3 inline-flex items-center rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-fuchsia-200">
                AUTHENTICATION
              </div>

              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    Password Strength & Hash
                  </h2>
                  <p className="mt-3 text-white/70">
                    Local-only password evaluation with a client-side SHA-256 hash preview.
                  </p>
                </div>

                <div
                  className={`rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] ${levelClasses(
                    passwordResult.severity
                  )}`}
                >
                  {passwordResult.label}
                </div>
              </div>

              <input
                id="password-tool-input"
                type="password"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                inputMode="text"
                maxLength={256}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type a password to test it"
                className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus:border-fuchsia-400/50 focus:outline-none"
              />

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-white/60">Strength Score</span>
                  <span className="text-white/80">{passwordResult.label}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: passwordBarWidth,
                      background:
                        "linear-gradient(90deg, rgba(244,114,182,0.25), rgba(236,72,153,0.72))",
                    }}
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {passwordChecks.map((check) => (
                  <div
                    key={check.label}
                    className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm"
                  >
                    <span
                      className={`mr-2 font-semibold ${
                        check.value ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {check.value ? "✓" : "✕"}
                    </span>
                    <span className="text-white/75">{check.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/45">
                    SHA-256 Hash
                  </p>
                  {passwordHash && !hashError ? (
                    <button
                      type="button"
                      onClick={() =>
                        void navigator.clipboard?.writeText(passwordHash)
                      }
                      className="rounded-full border border-fuchsia-400/20 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/70 transition hover:border-fuchsia-300/50 hover:bg-fuchsia-400/10"
                    >
                      Copy
                    </button>
                  ) : null}
                </div>

                {hashError ? (
                  <p className="text-sm text-rose-300">{hashError}</p>
                ) : password ? (
                  <p className="break-all font-mono text-xs leading-6 text-cyan-300">
                    {passwordHash}
                  </p>
                ) : (
                  <p className="text-sm text-white/45">
                    Enter text above to generate a hash locally.
                  </p>
                )}
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 text-xs font-mono uppercase tracking-[0.2em] text-white/35">
                Node 05 / Password Analysis
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-6 backdrop-blur-md transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.12)]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="relative z-10">
              <div className="mb-3 inline-flex items-center rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-fuchsia-200">
                THREAT ANALYSIS
              </div>

              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    URL Phishing Checker
                  </h2>
                  <p className="mt-3 text-white/70">
                    Local rule-based analysis only. This tool does not fetch or visit the URL.
                  </p>
                </div>

                <div
                  className={`rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] ${
                    highURLCount > 0
                      ? levelClasses("high")
                      : mediumURLCount > 0
                      ? levelClasses("medium")
                      : urlInput
                      ? levelClasses("low")
                      : levelClasses("info")
                  }`}
                >
                  {highURLCount > 0
                    ? "High Risk"
                    : mediumURLCount > 0
                    ? "Review"
                    : urlInput
                    ? "Low Indicators"
                    : "Awaiting URL"}
                </div>
              </div>

              <input
                id="url-checker-input"
                type="text"
                inputMode="url"
                autoComplete="off"
                spellCheck={false}
                maxLength={500}
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/login"
                className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus:border-fuchsia-400/50 focus:outline-none"
              />

              <button
                type="button"
                onClick={runURLCheck}
                className="mt-4 rounded-full border border-fuchsia-400/30 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-fuchsia-300/60 hover:bg-fuchsia-400/10 hover:text-white"
              >
                Analyze
              </button>

              <div className="mt-5 grid gap-3">
                {urlFindings.map((finding, index) => (
                  <div
                    key={`${finding.text}-${index}`}
                    className={`rounded-2xl border px-4 py-3 text-sm ${levelClasses(
                      finding.level
                    )}`}
                  >
                    {finding.text}
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 text-xs font-mono uppercase tracking-[0.2em] text-white/35">
                Node 06 / URL Triage
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-6 backdrop-blur-md transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.12)]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="relative z-10">
              <div className="mb-3 inline-flex items-center rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-fuchsia-200">
                PRIVACY
              </div>

              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    Metadata Scrubber
                  </h2>
                  <p className="mt-3 text-white/70">
                    Inspect image metadata locally, then export a cleaned copy.
                  </p>
                </div>

                <div
                  className={`rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] ${
                    metadataHasGPS
                      ? levelClasses("high")
                      : metadata
                      ? levelClasses("medium")
                      : levelClasses("info")
                  }`}
                >
                  {metadataHasGPS
                    ? "GPS Detected"
                    : metadata
                    ? "Metadata Present"
                    : "Awaiting File"}
                </div>
              </div>

              {metadataHasGPS ? (
                <div className="mb-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                  Warning: this image contains GPS coordinates that may reveal location data.
                </div>
              ) : metadata ? (
                <div className="mb-4 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
                  Metadata detected. Review embedded details before sharing.
                </div>
              ) : null}

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/35 px-6 py-10 text-center transition hover:border-fuchsia-300/40">
                <span className="text-lg font-medium">Drop an image or click to upload</span>
                <span className="mt-2 text-sm text-white/50">
                  JPG, PNG, or WEBP only · max 10MB
                </span>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={(e) => void handleFileChange(e.target.files?.[0] ?? null)}
                />
              </label>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void scrubMetadata()}
                  disabled={!selectedFile}
                  className="rounded-full border border-fuchsia-400/30 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-fuchsia-300/60 hover:bg-fuchsia-400/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Strip Metadata
                </button>

                {cleanedBlobUrl && (
                  <a
                    href={cleanedBlobUrl}
                    download={cleanedFileName}
                    className="rounded-full border border-fuchsia-400/30 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-fuchsia-300/60 hover:bg-fuchsia-400/10 hover:text-white"
                  >
                    Download Cleaned Image
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    resetImageState();
                    setScrubStatus("No file processed yet.");
                  }}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10"
                >
                  Clear
                </button>
              </div>

              <p className="mt-4 text-sm text-white/55">{scrubStatus}</p>

              <div className="mt-5 grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-white/40">
                    Detected Metadata
                  </p>

                  {metadata ? (
                    <div className="grid gap-3 text-sm text-white/70">
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <span className="block text-xs uppercase tracking-wide text-white/40">
                          Camera
                        </span>
                        <span>{metadata.camera ?? "Not available"}</span>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <span className="block text-xs uppercase tracking-wide text-white/40">
                          Date Taken
                        </span>
                        <span>{metadata.dateTaken ?? "Not available"}</span>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <span className="block text-xs uppercase tracking-wide text-white/40">
                          GPS Coordinates
                        </span>
                        <span className={metadata.gps ? "text-rose-300" : ""}>
                          {metadata.gps ?? "None detected"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/50">
                      {metadataStatus}
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-white/40">
                    Preview
                  </p>

                  {cleanedBlobUrl ? (
                    <img
                      src={cleanedBlobUrl}
                      alt="Metadata scrubbed preview"
                      className="h-40 w-full rounded-xl object-cover"
                    />
                  ) : originalPreview ? (
                    <img
                      src={originalPreview}
                      alt="Original uploaded preview"
                      className="h-40 w-full rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-40 items-center justify-center rounded-xl bg-white/5 text-sm text-white/35">
                      No image uploaded
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-fuchsia-400/15 bg-black/30 p-4 text-sm leading-6 text-white/60">
                <span className="mb-2 block text-xs font-mono uppercase tracking-[0.2em] text-fuchsia-300/70">
                  Local Processing Notice
                </span>
                All tools on this page run entirely in your browser. No files,
                URLs, or text inputs are uploaded, stored, or transmitted. That
                keeps things private while still showing practical security ideas
                like hashing, metadata analysis, and rule-based threat checks.
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 text-xs font-mono uppercase tracking-[0.2em] text-white/35">
                Node 07 / Image Privacy
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="group relative overflow-hidden rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-6 backdrop-blur-md transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.12)]">
              <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="relative z-10">
                <div className="mb-3 inline-flex items-center rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-fuchsia-200">
                  DFIR
                </div>

                <h2 className="text-2xl font-semibold text-white">
                  File Hash Generator
                </h2>
                <p className="mt-3 text-white/70">
                  Generate a SHA-256 hash from a local file without uploading it.
                </p>

                <input
                  type="file"
                  className="mt-5 block w-full text-sm text-white/70 file:mr-4 file:rounded-full file:border file:border-fuchsia-400/20 file:bg-fuchsia-400/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white/80 hover:file:bg-fuchsia-400/15"
                  onChange={(e) => void handleHashFile(e.target.files?.[0] ?? null)}
                />

                <p className="mt-4 text-sm text-white/55">{fileHashStatus}</p>

                {fileHashName ? (
                  <p className="mt-3 text-xs font-mono uppercase tracking-[0.2em] text-white/35">
                    Selected File: {fileHashName}
                  </p>
                ) : null}

                {fileHash ? (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">
                        SHA-256
                      </p>
                      <button
                        type="button"
                        onClick={() => void navigator.clipboard?.writeText(fileHash)}
                        className="rounded-full border border-fuchsia-400/20 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/70 transition hover:border-fuchsia-300/50 hover:bg-fuchsia-400/10"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="break-all font-mono text-xs leading-6 text-cyan-300">
                      {fileHash}
                    </p>
                  </div>
                ) : null}

                <div className="mt-6 border-t border-white/10 pt-4 text-xs font-mono uppercase tracking-[0.2em] text-white/35">
                  Node 08 / File Integrity
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[26px] border border-fuchsia-400/20 bg-black/45 p-6 backdrop-blur-md transition duration-300 hover:border-fuchsia-300/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.12)]">
              <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="relative z-10">
                <div className="mb-3 inline-flex items-center rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-fuchsia-200">
                  BROWSER SECURITY
                </div>

                <h2 className="text-2xl font-semibold text-white">
                  Browser Security Snapshot
                </h2>
                <p className="mt-3 text-white/70">
                  A quick client-side view of a few browser and page security signals.
                </p>

                <div className="mt-5 grid gap-3">
                  {browserChecks.map((check) => (
                    <div
                      key={check.label}
                      className="rounded-2xl border border-white/10 bg-black/35 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <h3 className="font-medium">{check.label}</h3>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] ${
                            check.status === "good"
                              ? levelClasses("low")
                              : check.status === "warning"
                              ? levelClasses("high")
                              : levelClasses("info")
                          }`}
                        >
                          {check.status}
                        </span>
                      </div>
                      <p className="text-sm leading-6 text-white/60">
                        {check.message}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-white/10 pt-4 text-xs font-mono uppercase tracking-[0.2em] text-white/35">
                  Node 09 / Browser Posture
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}