"use client"

import Image from "next/image"
import { useState } from "react"
import { projects, type Project } from "@/lib/projects"
import { ProjectCard } from "./ProjectCard"
import { ContentBlocks } from "./ContentBlocks"


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

            <button type="button" className="bg-accent text-primary px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                onClick={() => setShowMore(!showMore)}>
                {showMore ? "Ver menos" : "Ver mais"}
            </button>

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
                <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center">
                    <div className="flex flex-col items-center bg-accent max-w-3xl rounded-lx~ p-6">
                        <div className="">
                            <Image
                                className=" w-full h-auto object-cover"
                                src={selectedProject.image}
                                alt={selectedProject.name}
                                width={300}
                                height={200} />
                        </div>
                        <div className="max-w-3xl w-full bg-[#121826] rounded-2xl overflow-y-auto ">
                            <h3>{selectedProject.name}</h3>
                            <ContentBlocks blocks={selectedProject.description} />
                            <ContentBlocks blocks={selectedProject.howIBuilt} />
                        </div>
                    </div>

                </div>
            }

        </section>
    )
}

