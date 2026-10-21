
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

type NavItem = {
    label: string;
    href: string;
};

const navItems: NavItem[] = [
    { label: "Sobre", href: "#sobre" },
    { label: "Timeline", href: "#timeline" },
    { label: "Habilidades", href: "#habilidades" },
    { label: "Projetos", href: "#projetos" },
    { label: "Contatos", href: "#contatos" },
];

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-primary px-4 py-4 font-mono md:px-8">
            <Link
                href="#top"
                className="text-lg font-bold text-accent"
            >
                Fernandev
            </Link>

            {/* Botão hambúrguer: apenas mobile */}
            <button
                type="button"
                className="flex items-center justify-center text-xl text-text-secondary transition-colors hover:text-accent md:hidden"
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isMenuOpen}
                aria-controls="main-navigation"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Navegação */}
            <nav
                id="main-navigation"
                aria-label="Navegação principal"
                className={`${isMenuOpen ? "block" : "hidden"} absolute left-0 top-full w-full border-b border-border bg-primary px-4 py-4 md:static md:block md:w-auto md:border-0 md:bg-transparent md:p-0`}
            >
                <ul className="flex flex-col gap-4 md:flex-row md:gap-5">
                    {navItems.map(({ label, href }) => (
                        <li
                            key={href}
                            className="text-text-secondary transition-colors hover:text-accent"
                        >
                            <Link
                                href={href}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
