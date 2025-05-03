"use client";

import { useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";

interface CommandLineProps {
  onCommand: (command: string) => void;
}

export function CommandLine({ onCommand }: CommandLineProps) {
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onCommand(command);
      if (command.trim() !== "") {
        setCommandHistory((prev) => [...prev, command]);
      }
      setCommand("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (
        commandHistory.length > 0 &&
        historyIndex < commandHistory.length - 1
      ) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand("");
      }
    }
  };

  return (
    <div className="flex items-center bg-black border border-green-500 rounded-md p-2 shadow-[0_0_10px_rgba(0,255,0,0.3)]">
      <div className="flex items-center mr-2">
        <ArrowRight className="h-4 w-4 text-green-500" />
      </div>
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent text-green-500 outline-none caret-green-500"
        placeholder="Type a command..."
        autoFocus
      />
    </div>
  );
}
