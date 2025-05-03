"use client";

import { useState, useEffect } from "react";

export function Home() {
  const [text, setText] = useState("");
  const fullText = `
Hello, visitor.

Welcome to my terminal portfolio.

I'm a developer passionate about creating elegant solutions to complex problems.

This interactive terminal allows you to navigate through my portfolio.

Type 'help' to see available commands and explore my work.

Feel free to check out my projects, skills, and get in touch!
`;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="whitespace-pre-line">
      {text}
      <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-pulse"></span>
    </div>
  );
}
