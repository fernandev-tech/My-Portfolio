"use client"
import { useInView } from "@/hooks/useInView";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import Image from "next/image"

type WorkLinks = {
    label: string,
    href: string,
    Icon: React.ReactNode,
}
const workLinks: WorkLinks[] = [
    { label: "Github", href: "https://github.com/fernandev-tech", Icon: <FaGithub /> },
    { label: "Linkedin", href: "https://Linkedin.com/fernandobsebastiao", Icon: <FaLinkedin /> },

]

export function Hero() {
    

    return (
        <section
            className={`max-w-6xl mx-auto px-6 py-20 min-h-screen transition-all duration-700 ease-out `}>
            <div className="flex items-center gap-6">
                <div className="flex flex-col gap-6 flex-1">
                    <h1 className="text-5xl font-bold leading-tight">Fernando B Sebastião</h1>
                    <span className="text-sm self-start bg-accent/10 text-accent  rounded-full px-3 py-1 ">Comecei a programar no telemóvel.</span>
                    <p className="text-text-secondary leading-relaxed">Desenvolvedor Frontend. Sempre crescendo em engenharia de software desenvolvendo sistemas baseados em IU/UX focado nas tecnologias como React, TypeScript, NextJs, Tailwind CSS.</p>
                    <div className="flex gap-4">
                        <a href="/Fernando-CV.pdf" target="_blank" className="bg-accent text-primary px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity" >Download CV</a>
                        <a className="border border-accent text-accent px-6 py-3 rounded-lg font-medium hover:bg-accent/10 transition-colors" href="#projetos">Ver Projetos</a>
                    </div>
                    <div className="flex items-center gap-4">
                        {workLinks.map((workLink) => (
                            <a className="text-2xl text-text-secondary hover:text-accent transition-colors" key={workLink.href} aria-label={workLink.label} href={workLink.href}>{workLink.Icon}</a>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center items-center shrink-0 flex-1">
                    <Image
                        className="object-cover w-90 h-130 rounded-2xl"
                        src="/Perfil-Dev.png"
                        alt="Foto de Fernando B Sebastião"
                        width={400}
                        height={400}
                    />

                </div>
            </div>

        </section>
    )
}