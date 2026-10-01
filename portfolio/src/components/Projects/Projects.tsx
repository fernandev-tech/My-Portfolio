"use client"

import Image from "next/image"
import { useState } from "react"

type ProjectContentBlock =
    | { format: "title", content: string }
    | { format: "paragraph", content: string }
    | { format: "list", content: string[] };

type Projects = {
    name: string,
    shortDescription: string,
    typeProject: "Web" | "Mobile",
    year: string,
    tags: string[],
    image: string,
    viewProject: string,
    viewCode: string,
    description: ProjectContentBlock[],
    howIBuilt: ProjectContentBlock[],
    featured: boolean,
}
const projects: Projects[] = [
    {
        name: "Task Flow React",
        shortDescription: "Uma aplicação de gerenciamento de tarefas desenvolvida com React, com criação, edição, exclusão, conclusão e favoritos. O projeto utiliza localStorage para persistir os dados e possui navegação entre diferentes visualizações de tarefas.",
        typeProject: "Web",
        year: "2026",
        tags: ["React", "JavaScript", "Vite", "CSS Modules", "LocalStorage"],
        image: "/Projects/Task-Flow/Task-flow-screen.png",
        viewProject: "https://task-flow-fernandev.vercel.app/",
        viewCode: "https://github.com/fernandev-tech/Task-Flow/",
        description: [
            {
                format: "title",
                content: "Task Flow"
            },
            {
                format: "title",
                content: "Sobre O Projeto"
            },
            {
                format: "paragraph",
                content: "O React Task Flow é uma aplicação web de gerenciamento de tarefas criada com React e Vite. O projeto permite criar, editar, concluir, favoritar e excluir tarefas, além de apresentar diferentes visualizações para organizar melhor as informações."
            },
            {
                format: "paragraph",
                content: "Mais do que construir uma To-Do List, utilizei este projeto como um laboratório prático para aprofundar meus conhecimentos em React e entender como uma aplicação baseada em componentes organiza estado, dados, eventos e interface."
            },
            {
                format: "title",
                content: "Funcionalidades"
            },
            {
                format: "list",
                content: [
                    "Criar novas tarefas",
                    "Editar tarefas existentes",
                    "Cancelar uma edição",
                    "Excluir tarefas",
                    "Marcar tarefas como concluídas",
                    "Favoritar e desfavoritar tarefas",
                    "Visualizar todas as tarefas",
                    "Visualizar apenas tarefas favoritas",
                    "Exibir contadores de tarefas",
                    "Feedback visual para ações do usuário",
                    "Persistência das tarefas utilizando localStorage",
                    "Transição animada entre as diferentes listas",
                ]
            },
        ],
        howIBuilt: [
            {
                format: "title",
                content: "Como construí isto",
            },
            {
                format: "paragraph",
                content: "Comecei estruturando a aplicação em componentes independentes, separando responsabilidades entre o formulário, a lista de tarefas, os cartões individuais e os ícones."
            },
            {
                format: "paragraph",
                content: "O estado principal das tarefas ficou centralizado no componente App, que funciona como a fonte de verdade da aplicação. Os componentes filhos recebem os dados e as funções necessárias através de props e comunicam as ações do usuário de volta ao componente responsável pelo estado."
            },
            {
                format: "paragraph",
                content: "Durante o desenvolvimento, utilizei métodos de JavaScript como map(), filter() e find() para trabalhar com a coleção de tarefas. map() foi utilizado para transformar as tarefas em componentes TaskCard, enquanto filter() passou a ser utilizado para criar visualizações como a lista de favoritos. find() foi utilizado para localizar tarefas específicas, especialmente durante o processo de edição."
            },
            {
                format: "paragraph",
                content: "Também implementei estado derivado para evitar duplicação de informações. Por exemplo, a tarefa atualmente em edição é encontrada a partir do seu id, em vez de manter uma segunda cópia completa da tarefa no estado."
            },
            {
                format: "paragraph",
                content: "Para o formulário de edição, utilizei inputs controlados e useEffect para sincronizar os campos com a tarefa selecionada."
            },
            {
                format: "paragraph",
                content: "A persistência foi implementada utilizando localStorage, com JSON.stringify() para armazenar os dados e JSON.parse() para recuperá-los quando a aplicação é iniciada."
            },
            {
                format: "paragraph",
                content: "Também desenvolvi um sistema de feedback reutilizável para informar o usuário sobre ações como criação, edição, conclusão, favoritação e exclusão de tarefas."
            },
            {
                format: "paragraph",
                content: "Na organização visual, utilizei CSS Modules para manter os estilos dos componentes organizados e isolados."
            },
            {
                format: "paragraph",
                content: "Para a navegação entre Todas e Favoritas, optei por manter uma única fonte de verdade (tasks) e tratar as diferentes listas como visualizações derivadas. Assim, uma tarefa favoritada continua aparecendo na lista geral e também pode aparecer na lista de favoritos."
            },
            {
                format: "paragraph",
                content: "Por fim, implementei uma transição horizontal entre as listas utilizando animações CSS, @keyframes, transform, translateX(), opacity e overflow: hidden. Para determinar a direção da animação, utilizei useRef para guardar a lista anterior e useEffect para atualizar essa referência depois da mudança.",
            },
            {
                format: "title",
                content: "O que este projeto demonstra"
            },
            {
                format: "paragraph",
                content: "Este projeto demonstra minha prática com:"
            },
            {
                format: "list",
                content: [
                    "Componentização em React",
                    "Props e comunicação entre componentes",
                    "Gerenciamento de estado",
                    "Estado derivado",
                    "Hooks (useState, useEffect e useRef)",
                    "Eventos e formulários controlados",
                    "Manipulação de arrays em JavaScript",
                    "Persistência com localStorage",
                    "Renderização condicional",
                    "CSS Modules",
                    "Animações CSS",
                    "Organização de interfaces interativas",
                ]
            },
        ],
        featured: true,
    },
    {
        name: "Sistema de Gestão de Notas",
        shortDescription: "Sistema web desenvolvido para facilitar o gerenciamento de notas e a organização de estudantes. Possui autenticação, dashboards e diferentes áreas de acordo com o tipo de utilizador.",
        typeProject: "Web",
        year: "2026",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        image: "/Projects/Sistema-notas/sistema-notas.png",
        viewProject: "https://pf-notas.vercel.app",
        viewCode: "https://github.com/fernandev-tech/Pre-Projeto-Escolar-Sistema-Gestao-Notas/",
        description: [
            {
                format: "title",
                content: "Sistema de Gestão de Notas",
            },
            {
                format: "paragraph",
                content: "Sistema de Gestão de Notas é um projeto escolar desenvolvido individualmente com o objetivo de criar uma solução web para organizar e gerenciar informações relacionadas a estudantes e suas notas.",
            },
            {
                format: "paragraph",
                content: "O sistema foi estruturado com diferentes áreas de utilização, incluindo autenticação, dashboards e funcionalidades de gerenciamento, procurando representar uma aplicação real de gestão escolar. O projeto também foi publicado na Vercel e disponibilizado no GitHub para versionamento e consulta do código.",
            },
        ],
        howIBuilt: [
            {
                format: "title",
                content: "Como construí isto",
            },
            {
                format: "paragraph",
                content: "Comecei definindo a estrutura e as principais funcionalidades que o sistema precisava ter. A partir daí, desenvolvi a interface e as diferentes áreas do sistema utilizando Next.js e TypeScript, organizando as páginas de acordo com as responsabilidades de cada utilizador.",
            },
            {
                format: "paragraph",
                content: "Depois de concluir a primeira versão funcional, fiz o deploy do projeto na Vercel e disponibilizei o código no GitHub.",
            },
        ],
        featured: false,
    },
]

export function Projects() {

    const [showMore, setShowMore] = useState(false)

    const featuredProjects = projects.filter(project => project.featured)
    const moreProjects = projects.filter(project => !project.featured)

    return (
        <section id="projetos"
            className="max-w-6xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredProjects.map(project => (
                    <div
                        key={project.name}
                        className="p-6 rounded-2xl border border-white/10 bg-surface overflow-hidden">
                        <div className="relative">

                            <Image
                                className=" w-full h-auto object-cover"
                                src={project.image}
                                alt={project.name}
                                width={300}
                                height={200} />
                            <span className="absolute top-3 left-3 inline-flex items-center rounded-full border border-white/10 bg-accent px-3 py-1 text-xs ">{project.typeProject}</span>
                            <span className="absolute top-3 right-3 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{project.year}</span>
                        </div>
                        <h3 className="mt-3 text-xl font-semibold text-white">{project.name}</h3>
                        <p className="mt-2 text-sm text-slate-400 leading-relaxed">{project.shortDescription}</p>

                        <div
                            className="flex flex-wrap gap-2 mt-3">
                            {project.tags.map(projectTag => (
                                <span
                                    key={projectTag}
                                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{projectTag}
                                </span>
                            ))}
                        </div>


                    </div>
                ))}
            </div>
            <button type="button" className="bg-accent text-primary px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                onClick={() => setShowMore(!showMore)}>
                {showMore ? "Ver menos" : "Ver mais"}
            </button>
            {showMore && moreProjects.map(project => (
                <div
                    key={project.name}
                >
                    <Image
                        src={project.image}
                        alt={project.name}
                        width={400}
                        height={300} />
                    <h3>{project.name}</h3>
                    <p>{project.shortDescription}</p>

                </div>
            ))}
        </section>
    )
}