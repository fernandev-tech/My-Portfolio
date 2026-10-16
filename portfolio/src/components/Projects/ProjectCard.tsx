import Image from "next/image";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
    project: Project,
    onViewDetails: () => void,
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
    return (
        <div className="p-6 rounded-2xl border border-white/10 bg-surface overflow-hidden">
            <div className="relative">
                <Image
                    className="w-full h-auto object-cover"
                    src={project.image}
                    alt={project.name}
                    width={300}
                    height={200} />

                <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-accent-dark border border-accent text-white font-bold backdrop-blur-sm px-3 py-1 text-xs">{project.typeProject}</span>

                <span className="absolute top-3 right-3 inline-flex items-center rounded-full border border-accent bg-accent backdrop-blur-sm font-medium px-3 py-1 text-xs text-white">{project.year}</span>
            </div>

            <h3 className="mt-3 text-xl font-semibold text-white">{project.name}</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">{project.shortDescription}</p>

            <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map(projectTag => (
                    <span
                        key={projectTag}
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{projectTag}
                    </span>
                ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
                <a
                    href={project.viewCode}
                    className="inline-flex justify-center items-center flex-1 rounded-lg px-4 py-2.5 text-sm font-medium border border-white/10 bg-accent/10 text-white transition-colors hover:bg-accent/20">
                    Ver Código
                </a>
                <a
                    href={project.viewProject}
                    className="inline-flex justify-center items-center flex-1 rounded-lg px-4 py-2.5 text-sm font-medium border border-white/10 bg-accent/10 text-white transition-colors hover:bg-accent/20">
                    Visitar Projeto
                </a>
                <button
                    className="inline-flex justify-center items-center flex-1 rounded-lg px-4 py-2.5 text-sm font-medium bg-accent/20 text-white cursor-pointer hover:bg-accent/20 transition-colors"
                    onClick={onViewDetails}>
                    Detalhes
                </button>
            </div>
        </div>
    )
}