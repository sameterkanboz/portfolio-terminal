"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback, useRef } from "react";

interface BashAnimationProps {
  onComplete: () => void;
}

export function BashAnimation({ onComplete }: BashAnimationProps) {
  const [displayLines, setDisplayLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showingAsciiArt, setShowingAsciiArt] = useState(false);

  const t = useTranslations("Bash");

  const sebAscii = [
    "███████╗███████╗██████╗ ",
    "██╔════╝██╔════╝██╔══██╗",
    "███████╗█████╗  ██████╔╝",
    "╚════██║██╔══╝  ██╔══██╗",
    "███████║███████╗██████╔╝",
    "╚══════╝╚══════╝╚═════╝ ",
  ];

  const terminalLines = useRef([
    t("start"),
    t("loading"),
    t("init"),
    t("check"),
    t("mount"),
    t("network"),
    "",
    ...sebAscii,
    "",
    t("success"),
    t("welcome"),
    t("type"),
  ]).current;

  const asciiStartIndex = 7;
  const asciiEndIndex = asciiStartIndex + sebAscii.length - 1;

  const typeNextChar = useCallback(() => {
    if (currentLine >= terminalLines.length) {
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
      return;
    }

    if (currentLine === asciiStartIndex && currentChar === 0) {
      setShowingAsciiArt(true);
    }

    if (currentLine === asciiEndIndex + 1 && currentChar === 0) {
      setShowingAsciiArt(false);
      setTimeout(() => {
        typeNextCharacter();
      }, 2000);
      return;
    }

    typeNextCharacter();
  }, [
    currentLine,
    currentChar,
    terminalLines.length,
    asciiStartIndex,
    asciiEndIndex,
  ]);

  const typeNextCharacter = useCallback(() => {
    const line = terminalLines[currentLine];

    if (currentChar === 0) {
      setDisplayLines((prev) => {
        const newLines = [...prev];
        newLines[currentLine] = "";
        return newLines;
      });
    }

    if (currentChar < line.length) {
      setDisplayLines((prev) => {
        const newLines = [...prev];
        newLines[currentLine] =
          (newLines[currentLine] || "") + line[currentChar];
        return newLines;
      });
      setCurrentChar((prev) => prev + 1);
    } else {
      setCurrentLine((prev) => prev + 1);
      setCurrentChar(0);
    }
  }, [currentLine, currentChar, terminalLines]);

  const getTypingSpeed = useCallback(() => {
    if (currentLine >= asciiStartIndex && currentLine <= asciiEndIndex) {
      return 5;
    } else {
      return Math.random() * 30 + 20;
    }
  }, [currentLine, asciiStartIndex, asciiEndIndex]);

  useEffect(() => {
    const speed = getTypingSpeed();
    const delay = currentChar === 0 ? 300 : speed;

    const timer = setTimeout(typeNextChar, delay);
    return () => clearTimeout(timer);
  }, [currentLine, currentChar, typeNextChar, getTypingSpeed]);

  return (
    <div className="flex-1 overflow-auto p-4 bg-black text-green-500 border border-green-500 rounded-md shadow-[0_0_10px_rgba(0,255,0,0.3)] mb-4 font-mono">
      <div className="flex items-center justify-between mb-4 border-b border-green-500 pb-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs">samet-erkan-boz ~ bash</div>
        <div className="text-xs hidden md:inline">sameterkanboz@portfolio</div>
      </div>

      <pre className="whitespace-pre-wrap">
        {displayLines.map((line, index) => {
          const isAsciiArt = index >= asciiStartIndex && index <= asciiEndIndex;

          return (
            <div
              key={index}
              className={`${isAsciiArt ? "ascii-art text-blue-400" : ""} ${
                showingAsciiArt && isAsciiArt ? "animate-pulse-slow" : ""
              }`}
            >
              {line}
              {index === currentLine && !isComplete && (
                <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-[blink_1s_step-end_infinite]"></span>
              )}
            </div>
          );
        })}
      </pre>

      {showingAsciiArt && (
        <div className="fixed bottom-4 right-4 text-blue-400 text-sm animate-pulse">
          [SEB System Initializing...]
        </div>
      )}
    </div>
  );
}
