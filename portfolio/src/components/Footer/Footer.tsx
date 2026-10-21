
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaArrowUp,
  FaRegCopyright,
} from "react-icons/fa";

import type { IconType } from "react-icons";

type SocialLink = {
  href: string;
  label: string;
  Icon: IconType;
  color: string;
};

const socialLinks: SocialLink[] = [
  {
    href: "https://www.facebook.com/profile.php?id=100090174711865",
    label: "Facebook",
    Icon: FaFacebook,
    color: "#1877F2",
  },
  {
    href: "https://wa.me/244940150803",
    label: "WhatsApp",
    Icon: FaWhatsapp,
    color: "#25D366",
  },
  {
    href: "https://linkedin.com/fernandobsebastiao",
    label: "LinkedIn",
    Icon: FaLinkedin,
    color: "#0A66C2",
  },
  {
    href: "https://github.com/fernandev-tech",
    label: "GitHub",
    Icon: FaGithub,
    color: "#F0F0F0",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center gap-6 border-t-2 border-accent/10 bg-primary px-4 py-8 font-mono md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 md:px-8 lg:px-12">
      {/* Marca */}
      <div className="flex flex-col items-center gap-2 md:items-start">
        <h2 className="text-lg font-bold text-[#378add]">
          Fernandev
        </h2>

        <p className="text-muted-foreground">
          Desenvolvedor Web
        </p>
      </div>

      {/* Redes sociais */}
      <nav
        aria-label="Redes sociais"
        className="justify-self-center"
      >
        <ul className="flex items-center justify-center gap-5">
          {socialLinks.map(({ href, label, Icon, color }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex items-center justify-center transition-transform duration-200 hover:scale-110"
              >
                <Icon
                  aria-hidden="true"
                  className="text-xl"
                  style={{ color }}
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Copyright e navegação */}
      <div className="flex flex-col items-center gap-4 text-center md:items-end md:text-right">
        <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground md:justify-end">
          <FaRegCopyright aria-hidden="true" className="shrink-0" />
          <span>
            {currentYear} Fernando B. Sebastião. Todos os direitos reservados.
          </span>
        </p>

        <a
          className="flex items-center justify-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-white"
          href="#top"
        >
          Voltar ao início
          <FaArrowUp aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
