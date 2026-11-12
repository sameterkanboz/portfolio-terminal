"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface Item {
  name: string;
  description: string;
  technologies?: string[];
}

export function Projects() {
  const t = useTranslations("Projects");
  const items = t.raw("items") as Item[];
  const alsoItems = t.raw("alsoItems") as Item[];
  const [expanded, setExpanded] = useState<string | null>(items[0].name);

  return (
    <div className="space-y-6">
      <div className="text-xl text-green-400 mb-4">$ ls -la ./work</div>
      <div className="text-green-300">{t("heading")}</div>

      {items.map((item) => (
        <div key={item.name} className="border border-green-500/30 rounded p-3">
          <button
            type="button"
            className="flex items-center w-full text-left"
            aria-expanded={expanded === item.name}
            onClick={() =>
              setExpanded(expanded === item.name ? null : item.name)
            }
          >
            <ChevronRight
              className={`h-4 w-4 mr-2 transition-transform ${
                expanded === item.name ? "rotate-90" : ""
              }`}
            />
            <span className="text-green-300 font-bold">{item.name}</span>
          </button>

          {expanded === item.name && (
            <div className="mt-3 ml-6 space-y-3">
              <p>{item.description}</p>
              <div>
                <span className="text-green-400">{t("technologies")}</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {item.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="text-green-300 border-b border-green-500/30 pb-1">
        {t("also")}
      </div>
      {alsoItems.map((item) => (
        <div key={item.name}>
          <span className="text-green-400 mr-2">$</span>
          <span className="text-green-300 font-bold">{item.name}</span>
          <p className="ml-5 mt-1">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
