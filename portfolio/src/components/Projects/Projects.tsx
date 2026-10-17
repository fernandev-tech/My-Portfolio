"use client"

import Image from "next/image"
import { useState } from "react"
import { projects, type Project } from "@/lib/projects"
import { ProjectCard } from "./ProjectCard"
import { ContentBlocks } from "./ContentBlocks"
import { FaTimes } from "react-icons/fa";


export function Projects() {

    const [showMore, setShowMore] = useState(false)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    const featuredProjects = projects.filter(project => project.featured)
    const moreProjects = projects.filter(project => !project.featured)

    return (
        <section id="projetos"
            className="max-w-6xl mx-auto px-6 py-20">
            <h2>Projetos</h2>

            {/*Projetos em destaque---------------------------------------------*/}

            {/*Container grid dos projetos*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredProjects.map(project => (
                    <ProjectCard
                        key={project.name}
                        project={project}
                        onViewDetails={() => setSelectedProject(project)}
                    />
                ))}
            </div>

            {/*Botão ver mais--------------------------------------------*/}
            <div className="flex justify-center items-center my-8">
                <button type="button" className="w-full max-w-2xl mx-auto  bg-accent/10 border border-accent text-accent px-6 py-3 rounded-full font-medium hover:bg-accent/20 transition-colors"
                    onClick={() => setShowMore(!showMore)}>
                    {showMore ? "Ver menos" : "Ver mais"}
                </button>
            </div>
            {/*Mais Projetos---------------------------------------------*/}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {showMore && moreProjects.map(project => (
                    <ProjectCard
                        key={project.name}
                        project={project}
                        onViewDetails={() => setSelectedProject(project)}
                    />
                ))}
            </div>
            {/*Modal dos projetos----------------*/}
            {selectedProject &&
                <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4">
                    <div className="relative flex flex-col items-center bg-[#121826] max-w-3xl w-full max-h-[90vh] border border-accent rounded-xl p-6 overflow-y-auto">

                        {/*Fechar Modal*/}
                        <button
                            className="absolute top-2 right-2 font-bold rounded-lg px-4 py-2.5 border border-white/10 bg-accent/20 text-white cursor-pointer hover:bg-accent transition-colors"

                            onClick={() => setSelectedProject(null)}
                            type="button"><FaTimes /></button>

                        <div className="w-full mt-6">
                            <Image
                                className=" w-full h-auto"
                                src={selectedProject.image}
                                alt={selectedProject.name}
                                width={300}
                                height={200} />
                        </div>
                        <div className="max-w-3xl w-full rounded-2xl p-6">
                            <h3 className="mt-3 text-xl font-semibold text-white">{selectedProject.name}</h3>
                            <ContentBlocks blocks={selectedProject.description} />
                            <ContentBlocks blocks={selectedProject.howIBuilt} />

                            <div className="mt-4 flex justify-center items-center gap-4">
                                <a
                                    href={selectedProject.viewCode}
                                    className="inline-flex justify-center items-center flex-1 rounded-lg px-4 py-2.5 text-sm font-medium border border-white/10 bg-accent/10 text-white transition-colors hover:bg-accent/20">
                                    Ver Código
                                </a>
                                <a href={selectedProject.viewProject}
                                    className="inline-flex justify-center items-center flex-1 rounded-lg px-4 py-2.5 text-sm font-medium border border-white/10 bg-accent/10 text-white transition-colors hover:bg-accent/20">
                                    Visitar Projeto
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            }

        </section>
    )
}
{/*max-h-[90vh] limita a altura máxima da caixa a 90% da altura do ecrã.
- overflow-y-auto permite percorrer o conteúdo verticalmente quando ele não cabe nessa altura.*/ }
