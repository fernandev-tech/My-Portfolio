"use client"
import { useState } from "react"

type AboutTabs = {
    id: string,
    label: string,
    content: string[],
    format: "list" | "paragraph",
}

const aboutTabs: AboutTabs[] = [
    {
        id: "formacao-academica",
        label: "Formação Acadêmica",
        content: [
            "Iniciei meus estudos no Ensino Médio em 2023 - 2024 no Instituto Politécnico Privado O Pensador do Futuro II. E atualemente estou a frequentar o meu último ano na 13ª classe no curso de Informática Geral.",
            "Durante esse período, aprofundei conhecimentos diversas áreas da informáticaem informática e comecei a explorar programação por conta própria.",
        ],
        format: "paragraph",
    },
    {
        id: "formacao-profissional",
        label: "Formação Profissional",
        content: ["Oratória", "Informática Básica", "Pacote Office"],
        format: "list",

    },
    {
        id: "idiomas",
        label: "Idiomas Falados",
        content: ["Português", "Inglês"],
        format: "list",

    },
];



export function AboutMe() {

    const [activeTab, setActiveTab] = useState<string | null>(null)

    const contentTab = aboutTabs.find(aboutTab => aboutTab.id === activeTab)


    return (
        <section id="sobre" className="max-w-6xl mx-auto px-6 py-20 space-y-4">
            <h1>Sobre Mim</h1>
            <div className="text-text-secondary leading-relaxed">

                <p >
                    Sou Fernando B Sebastião, desenvolvedor web atualmente com foco em Frontend.
                    Trabalho principalmente com JavaScript, TypeScript, React, Next.js e
                    Tailwind CSS, criando interfaces funcionais, responsivas e bem estruturadas.
                </p>
                <p>
                    No desenvolvimento, procuro ir além de fazer uma interface funcionar.
                    Preocupo-me com a lógica da aplicação, a organização do código e a
                    experiência de quem utiliza aquilo que construo.
                </p>
                <p>
                    Minha jornada na programação começou do zero e, durante uma parte dos
                    meus estudos, sem ter um computador próprio. Foi pelo telemóvel que
                    comecei a praticar HTML, CSS e JavaScript e a transformar os primeiros
                    conceitos em pequenos projetos.
                </p>
                <p>
                    Esse percurso ensinou-me a aprender com os recursos que tenho, procurar
                    soluções por conta própria, desenvolver autonomia e continuar a evoluir mesmo quando as
                    condições não são ideais.
                </p>
                <p>
                    Atualmente, continuo aprofundando meus conhecimentos em desenvolvimento
                    web e expandindo minha base para Backend, APIs e bases de dados, com o
                    objetivo de compreender e construir aplicações cada vez mais completas.
                </p>
                <p className="mt-6 border-l-4 border-accent pl-4">
                    <span className="text-accent font-semibold">Beyond Code: </span>
                    Além de desenvolver, também ensino programação para iniciantes. Essa
                    experiência ajuda-me a comunicar ideias técnicas de forma simples,
                    trabalhar com diferentes pessoas e continuar a aprender enquanto ensino.
                </p>

            </div>
            <div className="flex gap-4 mt-8">
                {aboutTabs.map(aboutTab => (
                    <button key={aboutTab.id} id={aboutTab.id}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${aboutTab.id === activeTab ? "bg-accent text-primary" : "bg-surface text-text-secondary"}
`}
                        onClick={() => {
                            console.log("cliquei em:", aboutTab.id);
                            setActiveTab(aboutTab.id)
                            aboutTab.id === activeTab ? setActiveTab(null) : setActiveTab(aboutTab.id)
                        }}>
                        {aboutTab.label}
                    </button>
                ))}
            </div>
            <div className={contentTab ? "mt-6 p-6 bg-surface rounded-xl" : ""}>
                {contentTab?.format === "list" ? (
                    <ul className="space-y-2">
                        {contentTab.content.map((item, index) => (
                            <li key={index}
                                className="text-text-secondary">
                                {item}
                            </li>
                        ))}
                    </ul>
                ) : (
                    contentTab?.content.map((paragrafo, index) => (
                        <p key={index}
                            className="text-text-secondary"
                        >{paragrafo}</p>
                    ))
                )}

            </div>
        </section>
    )
}
{/*
  contentTab?. — optional chaining: se contentTab for undefined
  (nenhum tab ativo), para aqui e não tenta acessar .content,
  evitando que o programa quebre.

  .content.map((item, index) => ...) — percorre o array de
  strings do tab ativo (ex: ["Português", "Inglês"]), gerando
  um <li> pra cada item.

  key={index} — usamos o índice da posição (não um id) porque
  esses itens são strings simples, sem identificador próprio,
  e a lista é fixa (não muda dinamicamente com ações do usuário).
  Ver /estudo-key-id-vs-index.md pra mais detalhe.
*/}