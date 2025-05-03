import { useTranslations } from "next-intl";

export function Skills() {
  const t = useTranslations("Skills");
  const skillCategories = [
    {
      name: t("languages"),
      skills: ["JavaScript", "TypeScript", "Python", "HTML", "CSS", "SQL"],
    },
    {
      name: t("frameworks"),
      skills: [
        "React",
        "Next.js",
        "Node.js",
        "Express",
        "Tailwind CSS",
        "Redux",
      ],
    },
    {
      name: t("tools"),
      skills: ["Git", "GitHub", "VS Code", "Docker", "AWS", "Vercel"],
    },
    {
      name: t("other"),
      skills: [
        "Responsive Design",
        "RESTful APIs",
        "GraphQL",
        "UI/UX Design",
        "Testing",
        "CI/CD",
      ],
    },
  ];

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
