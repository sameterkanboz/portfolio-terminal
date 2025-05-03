"use client";

import { useEffect, useRef } from "react";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { Home } from "@/components/sections/home";
import { useTranslations } from "next-intl";

interface TerminalProps {
  history: string[];
  currentSection: string;
}

export function Terminal({ history, currentSection }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Terminal");
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, currentSection]);

  return (
    <div
      ref={terminalRef}
      className="flex-1 overflow-auto p-4 bg-black text-green-500 border border-green-500 rounded-md shadow-[0_0_10px_rgba(0,255,0,0.3)] mb-4 scrollbar-terminal"
    >
      <div className="flex items-center justify-between mb-4 border-b border-green-500 pb-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs">
          {t("page", { currentSection: currentSection })}
        </div>
        <div className="text-xs hidden md:inline"> {t("mark")}</div>
      </div>

      <div className="mb-4">
        {history.map((line, index) => (
          <div key={index} className="mb-1">
            {line}
          </div>
        ))}
      </div>
      {history.length > 0 && (
        <div className="mt-6 border-t border-green-500/30 pt-4">
          {currentSection === "home" && <Home />}
          {currentSection === "about" && <About />}
          {currentSection === "projects" && <Projects />}
          {currentSection === "skills" && <Skills />}
          {currentSection === "contact" && <Contact />}
        </div>
      )}
    </div>
  );
}
