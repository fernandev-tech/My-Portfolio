import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type WorkLink = {
    label: string;
    href: string;
    Icon: React.ReactNode;
};

const workLinks: WorkLink[] = [
    {
        label: "GitHub",
        href: "https://github.com/fernandev-tech",
        Icon: <FaGithub />,
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/fernandobsebastiao",
        Icon: <FaLinkedin />,
    },
];

export function Hero() {

    return (
        <section
            id="top"
            className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 font-mono sm:px-6 sm:py-14 md:py-20"
        >
            <div className="flex w-full flex-col items-stretch gap-8 md:flex-row md:items-center md:gap-10">

                {/* Conteúdo textual */}
                <div className="flex min-w-0 flex-1 flex-col items-start gap-5">
                    <span className="self-start rounded-full bg-accent/10 px-3 py-1 text-sm text-accent">
                        Crescer com o que tenho. Construir com o que aprendo.
                    </span>

                    <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                        Fernando B Sebastião
                    </h1>

                    <p className="leading-relaxed text-text-secondary">
                        Desenvolvedor web focado em criar interfaces intuitivas
                        e transformar ideias em aplicações funcionais. Trabalho
                        com React, TypeScript, Next.js e Tailwind CSS, com atenção
                        à experiência do utilizador (UI/UX) e uma evolução
                        contínua em engenharia de software.
                    </p>

                    {/* Botões */}
                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                        <a
                            href="/Fernando-CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full rounded-lg bg-accent px-6 py-3 text-center font-medium text-primary transition-opacity hover:opacity-90 sm:w-auto"
                        >
                            Descarregar CV
                        </a>

                        <a
                            href="#projetos"
                            className="w-full rounded-lg border border-accent px-6 py-3 text-center font-medium text-accent transition-colors hover:bg-accent/10 sm:w-auto"
                        >
                            Ver projetos
                        </a>
                    </div>

                    {/* Redes sociais */}
                    <div className="flex items-center gap-5">
                        {workLinks.map(({ label, href, Icon }) => (
                            <a
                                key={href}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="text-2xl text-text-secondary transition-colors hover:text-accent"
                            >
                                {Icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Fotografia */}
                <div className="flex w-full justify-center md:flex-1">
                    <Image
                        className="h-82 w-56 rounded-2xl object-cover sm:h-80 sm:w-64 md:h-110 md:w-80"
                        src="/Perfil-Dev.png"
                        alt="Fotografia de Fernando B Sebastião"
                        width={400}
                        height={400}
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
