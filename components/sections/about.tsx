import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("About");
  return (
    <div className="space-y-4">
      <div className="text-xl text-green-400 mb-4">$ cat about.txt</div>

      <pre className="whitespace-pre-wrap">{t("content")}</pre>
    </div>
  );
}
