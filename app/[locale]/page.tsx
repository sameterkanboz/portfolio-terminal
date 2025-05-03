"use client";

import { useState, useEffect } from "react";
import { Terminal } from "@/components/terminal";
import { CommandLine } from "@/components/command-line";
import { BashAnimation } from "@/components/bash-animation";
import { useTranslations } from "next-intl";
export const runtime = "edge";
export default function Home() {
  const [history, setHistory] = useState<string[]>([]);
  const [currentSection, setCurrentSection] = useState("home");
  const [showAnimation, setShowAnimation] = useState(true);
  const t = useTranslations("Home");

  useEffect(() => {
    if (!showAnimation) {
      const bootMessages = [t("ready")];

      let timeout = 0;
      bootMessages.forEach((message, index) => {
        timeout += index === 0 ? 0 : 500;
        setTimeout(() => {
          setHistory((prev) => [...prev, message]);
        }, timeout);
      });
    }
  }, [showAnimation]);

  const handleCommand = (command: string) => {
    setHistory((prev) => [...prev, `$ ${command}`]);

    const cmd = command.toLowerCase().trim();

    if (cmd === "help") {
      setHistory((prev) => [
        ...prev,
        t("commands"),
        `  home       - ${t("home")}`,
        `  about      - ${t("about")}`,
        `  projects   - ${t("projects")}`,
        `  skills     - ${t("skills")}`,
        `  contact    - ${t("contact")}`,
        `  clear      - ${t("clear")}`,
        `  help       - ${t("help")}`,
      ]);
    } else if (cmd === "clear") {
      setHistory([]);

      setCurrentSection("home");
    } else if (
      ["home", "about", "projects", "skills", "contact"].includes(cmd)
    ) {
      setCurrentSection(cmd);
      setHistory((prev) => [...prev, t("navigate", { cmd: cmd })]);
    } else if (cmd === "") {
    } else {
      setHistory((prev) => [...prev, t("not-found", { command: command })]);
    }
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  return (
    <main className="flex min-h-screen flex-col bg-black text-green-500 font-mono p-4">
      {showAnimation ? (
        <BashAnimation onComplete={handleAnimationComplete} />
      ) : (
        <>
          <Terminal history={history} currentSection={currentSection} />
          <CommandLine onCommand={handleCommand} />
        </>
      )}
    </main>
  );
}
