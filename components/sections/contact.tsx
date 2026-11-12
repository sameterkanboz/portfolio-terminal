import { Mail, Github, Linkedin, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export function Contact() {
  const t = useTranslations("Contact");

  return (
    <div className="space-y-6">
      <div className="text-xl text-green-400 mb-4">$ contact --connect</div>

      <div>
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

      </div>
    </div>
  );
}
