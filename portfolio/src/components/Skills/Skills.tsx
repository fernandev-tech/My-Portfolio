import {
    SiHtml5,
    SiJavascript,
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiNodedotjs,
    SiMysql,
    SiGit,
    SiGithub,
    SiVercel,
    SiNetlify,
} from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";
import { FaCss3Alt } from "react-icons/fa";
type Skill = {
    name: string,
    year: string,
    icon: React.ReactNode,
    color: string,
    badgeBg?: string,
}

type SkillCategory = {
    category: string,
    skills: Skill[],
}
const skillCategories: SkillCategory[] = [
    {
        category: "Frontend",
        skills: [
            { name: "HTML", year: "2024", icon: <SiHtml5 />, color: "#E34F26" },
            { name: "CSS", year: "2024", icon: <FaCss3Alt />, color: "#1572B6" },
            { name: "JavaScript", year: "2025", icon: <SiJavascript />, color: "#F7DF1E" },
            { name: "React", year: "2026", icon: <SiReact />, color: "#61DAFB" },
            { name: "Next.js", year: "2026", icon: <SiNextdotjs />, color: "#FFFFFF", badgeBg: "#000000" },
            { name: "TypeScript", year: "2026", icon: <SiTypescript />, color: "#3178C6" },
            { name: "Tailwind CSS", year: "2026", icon: <SiTailwindcss />, color: "#06B6D4" },
        ],

    },
    {
        category: "Backend",
        skills: [
            { name: "NodeJS", year: "2026", icon: <SiNodedotjs />, color: "#5FA04E" },
        ],
    },

    {
        category: "DataBase",
        skills: [
            { name: "MySql", year: "2026", icon: <SiMysql />, color: "#4479A1" },
        ],
    },

    {
        category: "Tools",
        skills: [
            { name: "VS Code", year: "2024", icon: <BiLogoVisualStudio />, color: "#007ACC" },
            { name: "Git", year: "2024", icon: <SiGit />, color: "#F05032" },
            { name: "GitHub", year: "2024", icon: <SiGithub />, color: "#FFFFFF" },
            { name: "Netlify", year: "2025", icon: <SiNetlify />, color: "#00C7B7" },
            { name: "Vercel", year: "2025", icon: <SiVercel />, color: "#FFFFFF", badgeBg: "#000000" },
        ],
    },
]
export function Skills() {
    return (
        <section id="habilidades"
            className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-4xl font-bold mb-8">Habilidades</h2>

            {skillCategories.map(category => (
                <div key={category.category}
                    className="mb-10">
                    <h3 className="text-xl font-semibold text-accent mb-4">{category.category}</h3>
                    <div
                        className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                        {category.skills.map(skill => (
                            <div
                                key={skill.name}
                                className="relative bg-surface rounded-xl p-4 text-center hover:-translate-y-1 transition-transform duration-300">

                                <span
                                    className="absolute top-2 right-2 text-xs bg-accent/10 text-accent rounded-full px-2 py-0.5">{skill.year}</span>
                                <div
                                    style={{
                                        color: skill.color,
                                        backgroundColor: skill.badgeBg,

                                    }}
                                    className={`text-6xl mx-auto w-20 h-20 flex items-center justify-center ${skill.badgeBg ? "rounded-full" : ""
                                        }`}>
                                    {skill.icon}
                                </div>
                                <p className="font-medium mt-2">{skill.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

        </section>

    )
}