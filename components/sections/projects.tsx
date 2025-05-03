"use client";

import { useState } from "react";
import { ChevronRight, ExternalLink, Github } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

export function Projects() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: "project1",
      name: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with payment processing, inventory management, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      github: "https://github.com/yourusername/ecommerce",
      demo: "https://ecommerce-demo.com",
    },
    {
      id: "project2",
      name: "Weather Application",
      description:
        "Real-time weather forecasting app with location detection and interactive maps.",
      technologies: ["JavaScript", "Weather API", "Geolocation API", "CSS3"],
      github: "https://github.com/yourusername/weather-app",
      demo: "https://weather-app-demo.com",
    },
    {
      id: "project3",
      name: "Task Management System",
      description:
        "Collaborative task management tool with real-time updates and team workspaces.",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
      github: "https://github.com/yourusername/task-manager",
      demo: "https://task-manager-demo.com",
    },
  ];

  const toggleProject = (id: string) => {
    if (expandedProject === id) {
      setExpandedProject(null);
    } else {
      setExpandedProject(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-xl text-green-400 mb-4">$ ls -la ./projects</div>

      {projects.map((project) => (
        <div
          key={project.id}
          className="border border-green-500/30 rounded p-3"
        >
          <div
            className="flex items-center cursor-pointer"
            onClick={() => toggleProject(project.id)}
          >
            <ChevronRight
              className={`h-4 w-4 mr-2 transition-transform ${
                expandedProject === project.id ? "rotate-90" : ""
              }`}
            />
            <span className="text-green-300 font-bold">{project.name}</span>
          </div>

          {expandedProject === project.id && (
            <div className="mt-3 ml-6 space-y-3">
              <p>{project.description}</p>

              <div>
                <span className="text-green-400">Technologies:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-green-400 hover:text-green-300"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    <span>Source Code</span>
                  </a>
                )}

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-green-400 hover:text-green-300"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
