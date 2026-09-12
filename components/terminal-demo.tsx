"use client";
import { Terminal } from "@/components/ui/terminal";

export default function TerminalDemo() {
  return (
    <section className="w-full py-10 md:py-20">
      <Terminal
        commands={[
          "npx shadcn@latest init",
          "npx shadcn add @shadcnloaders/classic-spinner",
          "npx shadcn add @shadcnloaders/fading-ring",
          "npx shadcn add @shadcnloaders/bars",
        ]}
        outputs={{
          0: [
            "✔ Preflight checks passed.",
            "✔ Created components.json",
            "✔ Initialized project.",
          ],
          1: ["✔ Done. Installed classic-spinner."],
          2: ["✔ Done. Installed fading-ring."],
          3: ["✔ Done. Installed bars."],
        }}
        typingSpeed={45}
        delayBetweenCommands={1000}
      />
    </section>
  );
}
