"use client";

import type React from "react";

import { useState } from "react";
import { Send, Mail, Github, Linkedin, Globe } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be replaced with actual form submission logic
    setStatus("Message sent successfully! I'll get back to you soon.");

    // Reset form after submission
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
            Contact Information
          </div>

          <div className="space-y-3">
            <a
              href="mailto:your.email@example.com"
              className="flex items-center text-green-400 hover:text-green-300"
            >
              <Mail className="h-4 w-4 mr-2" />
              <span>your.email@example.com</span>
            </a>

            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-green-400 hover:text-green-300"
            >
              <Github className="h-4 w-4 mr-2" />
              <span>github.com/yourusername</span>
            </a>

            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-green-400 hover:text-green-300"
            >
              <Linkedin className="h-4 w-4 mr-2" />
              <span>linkedin.com/in/yourusername</span>
            </a>

            <a
              href="https://yourwebsite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-green-400 hover:text-green-300"
            >
              <Globe className="h-4 w-4 mr-2" />
              <span>yourwebsite.com</span>
            </a>
          </div>
        </div>

        <div>
          <div className="text-green-300 border-b border-green-500/30 pb-1 mb-3">
            Send Message
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-green-400 mb-1">
                Name:
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
                Email:
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
                Message:
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
              <span>Send Message</span>
            </button>

            {status && <div className="text-green-400 mt-2">{status}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
