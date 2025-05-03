"use client";

import type React from "react";

import { useState } from "react";
import { Send, Mail, Github, Linkedin, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const t = useTranslations("Contact");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setStatus(t("success"));

    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setStatus(null);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      <div className="text-xl text-green-400 mb-4">$ contact --connect</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="text-green-300 border-b border-green-500/30 pb-1 mb-3">
            {t("title")}
          </div>

          <div className="space-y-3">
            <a
              href="mailto:sameterkanboz@gmail.com"
              className="flex items-center text-green-400 hover:text-green-300"
            >
              <Mail className="h-4 w-4 mr-2" />
              <span>sameterkanboz@gmail.com</span>
            </a>

            <a
              href="https://github.com/sameterkanboz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-green-400 hover:text-green-300"
            >
              <Github className="h-4 w-4 mr-2" />
              <span>github.com/sameterkanboz</span>
            </a>

            <a
              href="https://linkedin.com/in/sameterkanboz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-green-400 hover:text-green-300"
            >
              <Linkedin className="h-4 w-4 mr-2" />
              <span>linkedin.com/in/sameterkanboz</span>
            </a>

            <a
              href="https://seboz.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-green-400 hover:text-green-300"
            >
              <Globe className="h-4 w-4 mr-2" />
              <span>seboz.dev</span>
            </a>
          </div>
        </div>

        <div>
          <div className="text-green-300 border-b border-green-500/30 pb-1 mb-3">
            {t("send-message")}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-green-400 mb-1">
                {t("name")}:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black border border-green-500 rounded p-2 text-green-300 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-green-400 mb-1">
                {t("email")}:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black border border-green-500 rounded p-2 text-green-300 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-green-400 mb-1">
                {t("message")}:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-black border border-green-500 rounded p-2 text-green-300 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="flex items-center bg-green-700 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
            >
              <Send className="h-4 w-4 mr-2" />
              <span>{t("send-message")}</span>
            </button>

            {status && <div className="text-green-400 mt-2">{status}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
