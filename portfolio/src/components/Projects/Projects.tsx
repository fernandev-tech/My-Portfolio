"use client"

import Image from "next/image"
import { useState } from "react"
import { projects, type Project } from "@/lib/projects"
import { ProjectCard } from "./ProjectCard"
import { ContentBlocks } from "./ContentBlocks"
import { FaTimes } from "react-icons/fa"

export function Projects() {
    const [showMore, setShowMore] = useState(false)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    const featuredProjects = projects.filter(project => project.featured)
    const moreProjects = projects.filter(project => !project.featured)

    return (
        <section
            id="projetos"
            className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20"
        >
            <h2 className="mb-8 text-3xl font-bold sm:text-4xl">
                Projetos
            </h2>

            {/* Projetos em destaque */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                {featuredProjects.map(project => (
                    <ProjectCard
                        key={project.name}
                        project={project}
                        onViewDetails={() => setSelectedProject(project)}
                    />
                ))}
            </div>

            {/* Botão ver mais */}
            <div className="my-8 flex items-center justify-center">
                <button
                    type="button"
                    className="mx-auto w-full max-w-2xl rounded-full border border-accent bg-accent/10 px-6 py-3 font-medium text-accent transition-colors hover:bg-accent/20"
                    onClick={() => setShowMore(!showMore)}
                >
                    {showMore ? "Ver menos" : "Ver mais"}
                </button>
            </div>

            {/* Mais projetos */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                {showMore && moreProjects.map(project => (
                    <ProjectCard
                        key={project.name}
                        project={project}
                        onViewDetails={() => setSelectedProject(project)}
                    />
                ))}
            </div>

            {/* Modal dos projetos */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-4">
                    {/* Card do modal */}
                    <div className="relative my-auto flex max-h-[95dvh] w-full max-w-3xl flex-col items-center overflow-y-auto rounded-xl border border-accent bg-surface p-4 sm:max-h-[90vh] sm:p-6">

                        {/* Fechar modal */}

                        <div className="sticky top-0 z-20 flex w-full justify-end bg-[#121826] py-2">
                            <button
                                onClick={() => setSelectedProject(null)}
                                type="button"
                                aria-label="Fechar detalhes do projeto"
                                className="rounded-lg border border-white/10 bg-accent/20 p-3 text-white transition-colors hover:bg-accent"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div className="mt-10 w-full sm:mt-6">
                            <Image
                                className="h-auto w-full rounded-lg object-cover"
                                src={selectedProject.image}
                                alt={selectedProject.name}
                                width={300}
                                height={200}
                            />
                        </div>

                        <div className="w-full max-w-3xl rounded-2xl p-1 sm:p-2 md:p-6">
                            <h3 className="mt-3 wrap-break-word text-lg font-semibold text-white sm:text-xl">
                                {selectedProject.name}
                            </h3>

                            {/* Tags tecnológicas */}
                            <div className="mt-3 flex flex-wrap gap-2">
                                {selectedProject.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 sm:px-3"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <ContentBlocks blocks={selectedProject.description} />
                            <ContentBlocks blocks={selectedProject.howIBuilt} />

                            <div className="mt-4 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:gap-4">
                                <a
                                    href={selectedProject.viewCode}
                                    className="inline-flex w-full flex-1 items-center justify-center rounded-lg border border-white/10 bg-accent/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/20 sm:w-auto"
                                >
                                    Ver Código
                                </a>

                                <a
                                    href={selectedProject.viewProject}
                                    className="inline-flex w-full flex-1 items-center justify-center rounded-lg border border-white/10 bg-accent/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/20 sm:w-auto"
                                >
                                    Visitar Projeto
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}