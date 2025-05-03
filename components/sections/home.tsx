"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export function Home() {
  const [text, setText] = useState("");
  const t = useTranslations("Home");
  const fullText = t("welcome");

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
