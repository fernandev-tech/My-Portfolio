import Link from "next/link"

type NavItem = {
    label: string,
    href: string
}
export function Header() {


    const navItems: NavItem[] = [
        { label: "Sobre", href: "#sobre" },
        { label: "Timeline", href: "#timeline" },
        { label: "Habilidades", href: "#habilidades" },
        { label: "Projetos", href: "#projetos" },
        { label: "Contatos", href: "#contatos" },
    ]

    return (
        <header className={`sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-primary border-b border-border font-mono `}>
            <span>Fernandev</span>


            <nav>
                <ul className={`flex gap-5`}>
                    {navItems.map(navItem => (
                        <li key={navItem.href} className={`text-text-secondary hover:text-accent transition-colors`}><Link href={navItem.href}>{navItem.label}</Link></li>
                    ))}
                </ul>
            </nav>

        </header>
    )
}
{/*O bg-primary é a clase que criamos */}