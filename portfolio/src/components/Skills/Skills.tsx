type Skill = {
    name: string,
    year: string,
}

type SkillCategory = {
    category: string,
    skills: Skill[],
}
const skillCategories: SkillCategory[] = [
    {
        category: "Frontend",
        skills: [
            { name: "HTML", year: "2024" },
            { name: "CSS", year: "2024" },
            { name: "JavaScript", year: "2025" },
            { name: "React", year: "2026" },
            { name: "Next.js", year: "2026" },
            { name: "TypeScript", year: "2026" },
            { name: "Tailwind CSS", year: "2026" },
        ],

    },
    {
        category: "Backend",
        skills: [
            { name: "NodeJS", year: "2026" },
        ],
    },

    {
        category: "DataBase",
        skills: [
            { name: "MySql", year: "2026" },
        ],
    },

    {
        category: "Tools",
        skills: [
            { name: "VS Code", year: "2024" },
            { name: "Git", year: "2024" },
            { name: "GitHub", year: "2024" },
            { name: "Netlify", year: "2025" },
            { name: "Vercel", year: "2025" },
        ],
    },
]
export function Skills() {
    return (
        <section id="habilidades"
            className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-4xl font-bold mb-8">Habilidades</h2>

            {skillCategories.map(category => (
                <div
                    key={category.category}
                    className="mb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <h3 className="text-xl font-semibold text-accent mb-4">{category.category}</h3>
                    {category.skills.map(skill => (
                        <div
                            key={skill.name}
                            className="relative bg-surface rounded-xl p-4 text-center">
                            <span
                                className="absolute top-2 right-2 text-xs bg-accent/10 text-accent rounded-full px-2 py-0.5">{skill.year}</span>
                            <p>{skill.name}</p>
                        </div>
                    ))}
                </div>
            ))}

        </section>

    )
}