
"use client";

import { useState } from "react";

type AboutTabs = {
  id: string;
  label: string;
  content: string[];
  format: "list" | "paragraph";
};

const aboutTabs: AboutTabs[] = [
  {
    id: "formacao-academica",
    label: "Formação Académica",
    content: [
      "Iniciei os meus estudos no Ensino Médio em 2023 - 2024, no Instituto Politécnico Privado O Pensador do Futuro II. Atualmente, frequento o último ano, na 13.ª classe, do curso de Informática Geral.",
      "Durante esse período, aprofundei conhecimentos em diversas áreas da informática e comecei a explorar programação por conta própria.",
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
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const contentTab = aboutTabs.find(
    (aboutTab) => aboutTab.id === activeTab
  );

  return (
    <section
      id="sobre"
      className="mx-auto max-w-6xl space-y-4 px-4 py-12 sm:px-6 sm:py-16 md:py-20"
    >
      <h2 className="mb-6 text-3xl font-bold sm:mb-8 sm:text-4xl">
        Sobre Mim
      </h2>

      <div className="space-y-4 leading-relaxed text-text-secondary">
        <p>
          Sou Fernando B Sebastião, desenvolvedor web atualmente
          com foco em Frontend. Trabalho principalmente com
          JavaScript, TypeScript, React, Next.js e Tailwind CSS,
          criando interfaces funcionais, responsivas e bem estruturadas.
        </p>

        <p>
          No desenvolvimento, procuro ir além de fazer uma interface
          funcionar. Preocupo-me com a lógica da aplicação, a
          organização do código e a experiência de quem utiliza
          aquilo que construo.
        </p>

        <p>
          A minha jornada na programação começou do zero e, durante
          uma parte dos meus estudos, sem ter um computador próprio.
          Foi pelo telemóvel que comecei a praticar HTML, CSS e
          JavaScript e a transformar os primeiros conceitos em
          pequenos projetos.
        </p>

        <p>
          Esse percurso ensinou-me a aprender com os recursos que
          tenho, procurar soluções por conta própria, desenvolver
          autonomia e continuar a evoluir mesmo quando as condições
          não são ideais.
        </p>

        <p>
          Atualmente, continuo a aprofundar os meus conhecimentos
          em desenvolvimento web e a expandir a minha base para
          Backend, APIs e bases de dados, com o objetivo de
          compreender e construir aplicações cada vez mais completas.
        </p>

        <p className="mt-6 border-l-4 border-accent pl-4">
          <span className="font-semibold text-accent">
            Beyond Code:{" "}
          </span>
          Além de desenvolver, também ensino programação para
          iniciantes. Essa experiência ajuda-me a comunicar ideias
          técnicas de forma simples, trabalhar com diferentes
          pessoas e continuar a aprender enquanto ensino.
        </p>
      </div>

      {/* Botões das informações adicionais */}
      <div className="mt-8 flex flex-wrap gap-3">
        {aboutTabs.map((aboutTab) => (
          <button
            key={aboutTab.id}
            type="button"
            aria-expanded={aboutTab.id === activeTab}
            aria-controls="about-tab-panel"
            className={`max-w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-4 sm:text-base ${
              aboutTab.id === activeTab
                ? "bg-accent text-primary"
                : "bg-surface text-text-secondary"
            }`}
            onClick={() => {
              setActiveTab(
                aboutTab.id === activeTab ? null : aboutTab.id
              );
            }}
          >
            {aboutTab.label}
          </button>
        ))}
      </div>

      {/* Painel de conteúdo */}
      <div
        id="about-tab-panel"
        aria-live="polite"
        className={`overflow-hidden transition-all duration-300 ${
          contentTab
            ? "mt-6 max-h-160 rounded-xl bg-surface p-4 opacity-100 sm:p-6"
            : "max-h-0 p-0 opacity-0"
        }`}
      >
        {contentTab?.format === "list" ? (
          <ul className="space-y-2">
            {contentTab.content.map((item) => (
              <li key={item} className="text-text-secondary">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          contentTab?.content.map((paragraph, index) => (
            <p
              key={index}
              className="mb-3 leading-relaxed text-text-secondary last:mb-0"
            >
              {paragraph}
            </p>
          ))
        )}
      </div>
    </section>
  );
}
