"use client";

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

  // ASCII art for "SEB"
  const sebAscii = [
    "███████╗███████╗██████╗ ",
    "██╔════╝██╔════╝██╔══██╗",
    "███████╗█████╗  ██████╔╝",
    "╚════██║██╔══╝  ██╔══██╗",
    "███████║███████╗██████╔╝",
    "╚══════╝╚══════╝╚═════╝ ",
  ];

  // Additional terminal lines to display before and after the ASCII art
  const terminalLines = useRef([
    "Starting system...",
    "Loading kernel modules...",
    "Initializing hardware...",
    "Checking file system...",
    "Mounting partitions...",
    "Starting network services...",
    "",
    ...sebAscii,
    "",
    "System initialized successfully.",
    "Welcome to Terminal Portfolio v1.0.0",
    "Type 'help' to see available commands.",
  ]).current;

  // Calculate the line indices where ASCII art starts and ends
  const asciiStartIndex = 7;
  const asciiEndIndex = asciiStartIndex + sebAscii.length - 1;

  // Function to type the next character
  const typeNextChar = useCallback(() => {
    if (currentLine >= terminalLines.length) {
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
      return;
    }

    // Check if we're about to start typing the ASCII art
    if (currentLine === asciiStartIndex && currentChar === 0) {
      setShowingAsciiArt(true);
    }

    // Check if we've just finished typing the ASCII art and need to pause
    if (currentLine === asciiEndIndex + 1 && currentChar === 0) {
      setShowingAsciiArt(false);
      setTimeout(() => {
        // Continue typing after pause
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

  // Helper function to actually type the next character
  const typeNextCharacter = useCallback(() => {
    const line = terminalLines[currentLine];

    // If this is a new line, initialize it
    if (currentChar === 0) {
      setDisplayLines((prev) => {
        const newLines = [...prev];
        newLines[currentLine] = "";
        return newLines;
      });
    }

    // If we haven't reached the end of the current line
    if (currentChar < line.length) {
      setDisplayLines((prev) => {
        const newLines = [...prev];
        newLines[currentLine] =
          (newLines[currentLine] || "") + line[currentChar];
        return newLines;
      });
      setCurrentChar((prev) => prev + 1);
    } else {
      // Move to the next line
      setCurrentLine((prev) => prev + 1);
      setCurrentChar(0);
    }
  }, [currentLine, currentChar, terminalLines]);

  // Determine typing speed based on content
  const getTypingSpeed = useCallback(() => {
    if (currentLine >= asciiStartIndex && currentLine <= asciiEndIndex) {
      return 5; // Type ASCII art faster
    } else {
      return Math.random() * 30 + 20; // Normal typing speed for other text
    }
  }, [currentLine, asciiStartIndex, asciiEndIndex]);

  useEffect(() => {
    const speed = getTypingSpeed();
    const delay = currentChar === 0 ? 300 : speed; // Longer delay between lines

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
        <div className="text-xs">terminal-boot ~ bash</div>
        <div className="text-xs">user@portfolio</div>
      </div>

      <pre className="whitespace-pre-wrap">
        {displayLines.map((line, index) => {
          // Check if this line is part of the ASCII art
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

      {/* Show a special indicator when displaying ASCII art */}
      {showingAsciiArt && (
        <div className="fixed bottom-4 right-4 text-blue-400 text-sm animate-pulse">
          [SEB System Initializing...]
        </div>
      )}
    </div>
  );
}
