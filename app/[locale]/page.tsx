"use client";

import { useState, useEffect } from "react";
import { Terminal } from "@/components/terminal";
import { CommandLine } from "@/components/command-line";
import { BashAnimation } from "@/components/bash-animation";
import { useTranslations } from "next-intl";

export default function Home() {
  const [history, setHistory] = useState<string[]>([]);
  const [currentSection, setCurrentSection] = useState("home");
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    if (!showAnimation) {
      // Initial boot sequence after animation
      const bootMessages = ["Terminal ready."];

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
        "Available commands:",
        "  home       - Display welcome screen",
        "  about      - View information about me",
        "  projects   - Browse my portfolio projects",
        "  skills     - List my technical skills",
        "  contact    - Get my contact information",
        "  clear      - Clear the terminal",
        "  help       - Show this help message",
      ]);
    } else if (cmd === "clear") {
      setHistory([]);
      // Also reset the current section to home when clearing
      setCurrentSection("home");
    } else if (
      ["home", "about", "projects", "skills", "contact"].includes(cmd)
    ) {
      setCurrentSection(cmd);
      setHistory((prev) => [...prev, `Navigating to ${cmd}...`]);
    } else if (cmd === "") {
      // Do nothing for empty command
    } else {
      setHistory((prev) => [
        ...prev,
        `Command not found: ${command}. Type 'help' for available commands.`,
      ]);
    }
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };
  const t = useTranslations("HomePage");
  return (
    <main className="flex min-h-screen flex-col bg-black text-green-500 font-mono p-4">
      {showAnimation ? (
        <>
          <h1>{t("title")}</h1>
          <BashAnimation onComplete={handleAnimationComplete} />
        </>
      ) : (
        <>
          <Terminal history={history} currentSection={currentSection} />
          <CommandLine onCommand={handleCommand} />
        </>
      )}
    </main>
  );
}
