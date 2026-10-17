"use client"

import { useInView } from "@/hooks/useInView"
type MyJourney = {
    year: string,
    title: string,
    description: string
}
const myJourney: MyJourney[] = [
    {
        year: "2023",
        title: "Início dos Estudos em Informática",
        description: "Início da formação técnica em informática no ensino médio, desenvolvendo interesse por tecnologia mesmo sem possuir computador ou telemóvel próprio.",
    },
    {
        year: "2024",
        title: "Primeiros Passos na Programação",
        description: "Aprendizagem de lógica de programação utilizando Portugol e desenvolvimento dos primeiros algoritmos. No final do ano, iniciei os estudos de HTML e desenvolvimento web.",
    },
    {
        year: "2025",
        title: "Desenvolvimento Web e Linguagem C",
        description: "Continuação dos estudos de HTML, aprendizagem de CSS e JavaScript e desenvolvimento de projetos web. Também desenvolvi exercícios e projetos em Linguagem C, utilizando principalmente os recursos disponíveis na escola.",
    },
    {
        year: "2026",
        title: "Projetos, Redes e Portfólio",
        description: "Participação em projetos escolares com tecnologias como Next.js, aprofundamento em Redes de Computadores, revisão dos fundamentos de HTML, CSS e JavaScript moderno e desenvolvimento do meu portfólio profissional após adquirir meu primeiro computador pessoal. ",
    }
]
export function TimeLine() {

    const { ref, progress } = useInView();

    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const scale = 0.95 + easedProgress * 0.05;
    const opacity = easedProgress;
    const translateY = (1 - easedProgress) * 40;

    return (
        <section id="timeline"
            ref={ref}
            style={{
                opacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
            }}
            className="max-w-6xl mx-auto px-6 py-20 space-y-10">
            <h2 className="text-4xl font-bold mb-8">Minha Jornada</h2>
            {myJourney.map((journey, index) => (
                <div
                    key={journey.year}
                    className="relative pl-8 border-l-2 border-border ">
                    <div
                        className={`absolute left-[-9px] top-1 rounded-full bg-accent ${index === myJourney.length - 1 ? "w-5 h-5 ring-4 ring-accent/30" : "w-4 h-4"
                            }`}
                    />
                    <span className="text-accent font-mono text-sm">{journey.year}</span>
                    <h3 className="text-xl font-bold mt-1">{journey.title}</h3>
                    <p className="text-text-secondary mt-2">{journey.description}</p>
                </div>
            ))}



        </section>
    )
}