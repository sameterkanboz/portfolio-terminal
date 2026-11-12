import { useTranslations } from "next-intl";

export function Skills() {
  const t = useTranslations("Skills");
  const skillCategories = t.raw("groups") as {
    name: string;
    skills: string[];
  }[];

  return (
    <div className="space-y-6">
      <div className="text-xl text-green-400 mb-4">$ apt list --installed</div>

      {skillCategories.map((category, index) => (
        <div key={index} className="mb-6">
          <div className="text-green-300 border-b border-green-500/30 pb-1 mb-3">
            {category.name}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="flex items-center">
                <span className="text-green-400 mr-2">$</span>
                <div className="flex justify-between w-full">
                  <span>{skill}</span>
                  <span className="text-green-400/70">{t("installed")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
