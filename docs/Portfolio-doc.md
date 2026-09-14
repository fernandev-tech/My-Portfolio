# Documentação do Portfólio — Fernando B Sebastião (v2 — Next.js + Tailwind)

> Esta versão substitui a documentação anterior (React + CSS puro), após ajuste de stack pedido pelo orientador. Estrutura de seções e decisões de UX continuam as mesmas — o que muda é a forma de implementação (framework e estilo).

---

## 1. Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS |

Mudança de stack feita a pedido do orientador. A estrutura de seções, interações e paleta definidas anteriormente permanecem válidas — Next.js é React por baixo, e Tailwind substitui o CSS Modules/variáveis `:root` que tínhamos planejado (agora viram configuração no `tailwind.config`).

---

## 2. Estrutura de pastas (App Router)

```
src/
  app/
    layout.tsx        -> layout raiz, importa fontes e estilos globais
    page.tsx           -> monta a página juntando todas as seções, em ordem
    globals.css        -> diretivas do Tailwind + estilos globais mínimos
  components/
    Header/
      Header.tsx
    Hero/
      Hero.tsx
    AboutMe/
      AboutMe.tsx        -> texto + nota "Beyond Code" no final
      Tabs.tsx            -> lógica dos tabs (Formação Acadêmica, Formação Profissional, Idiomas)
    Timeline/
      Timeline.tsx        -> seção própria, não é mais tab
    Skills/
      Skills.tsx
      SkillCategory.tsx    -> agrupado por categoria + indicador dominado/aprendendo
    Projects/
      Projects.tsx
      FeaturedProject.tsx
      ProjectCard.tsx
      ProjectModal.tsx     -> inclui texto "Como construí isto"
    Contact/
      Contact.tsx
      ContactForm.tsx
      ContactCard.tsx
    Footer/
      Footer.tsx
    WhatsAppBubble/
      WhatsAppBubble.tsx
  hooks/
    useInView.ts          -> Intersection Observer para scroll-reveal
  lib/ (ou data/)
    projects.ts            -> dados dos projetos (tipados)
    nav.ts                 -> itens de navegação
```

---

## 3. Estrutura das seções (detalhada)

### 3.1 Header
- Fixo/sticky durante toda a navegação
- Nome à esquerda
- Nav à direita: Sobre, Timeline, Projetos, Habilidades, Contato
- Sem botão de CV (fica no Hero)
- Sem ícones sociais (ficam no Hero/Footer)

### 3.2 Hero
- Nome grande à esquerda + foto ao lado
- **Selo/tag de destaque** perto do nome (ex: "Aprendi a programar num telemóvel") — sinaliza a história antes mesmo de rolar
- Texto curto de apresentação
- Botão primário **Download CV** (preenchido)
- Botão secundário **Ver Projetos** (contornado)
- Ícones pequenos de **GitHub** e **LinkedIn** perto do botão de CV

### 3.3 Sobre mim
- Bloco de texto puro (sem foto)
- Abaixo do texto, 3 tabs fixos: **Formação Acadêmica** | **Formação Profissional** | **Idiomas**
- Um único painel de conteúdo, posição fixa — troca de conteúdo ao clicar, não empilha; clicar no tab ativo fecha (toggle)
- **No final do texto**: nota pequena com destaque visual sobre **"Beyond Code"** — o que faz além de codar (ensinar, comunicar, pesquisar, entretenimento)

### 3.4 Timeline (seção própria — não é mais tab)
- Conta a jornada real: aprendeu HTML/CSS/JS no telemóvel sem computador → construiu projeto Next.js dirigindo uma IA sem escrever código → aprofundou JavaScript moderno → aprendeu React → hoje
- Capítulo atual da timeline reflete o que está aprendendo **agora** (ex: Next.js a fundo)
- Vira a narrativa central/diferencial do portfólio — resposta direta ao pedido de mais criatividade do orientador

### 3.5 Habilidades
- Agrupadas por categoria: Frontend, Backend, Banco de Dados, Ferramentas
- Grid de ícones, hover sutil (leve movimento/zoom)
- Indicador visual separando **dominado** vs. **aprendendo agora** (ex: Next.js)

### 3.6 Projetos
- 2 projetos em destaque no topo: imagem + descrição lado a lado, sempre visíveis
- Botão **"Ver mais projetos"** abaixo dos destaques → expande grid de projetos restantes na mesma página
- Cada card (destaque e grid): badge sobre a imagem com tipo de projeto (Mobile/Web) de um lado e data do outro
- Cards do grid: nome, descrição curta, tags de tecnologia, botão "Descrição"
- Botão "Descrição" abre **modal centralizado**: imagem + texto completo + **"Como construí isto"** (processo/raciocínio daquele projeto específico) + botões Ver Código/Ver Projeto + X para fechar + fundo escurecido

### 3.7 Contato
- Duas colunas: esquerda com título de impacto + texto + cards de Email/Telefone/Localização; direita com formulário (Nome, Email, Mensagem)
- Microcopy pessoal nos textos e botões (ex: "Vamos conversar" em vez de "Enviar Mensagem")
- WhatsApp não aparece aqui — é bolha flutuante

### 3.8 Footer
- Ícones de GitHub e LinkedIn
- Copyright / link de volta ao topo

### 3.9 Elemento flutuante
- WhatsApp: bolha fixa no canto inferior direito, visível durante toda a navegação

---

## 4. Princípio-guia do conteúdo

Qualquer visitante — dev ou não — precisa sair da página sabendo:
1. Quem é Fernando
2. O que ele sabe fazer
3. O que ele já construiu com essas habilidades
4. Como entrar em contacto

Toda decisão criativa (Timeline como narrativa, selo no Hero, Beyond Code, How I Build) deve reforçar essas 4 respostas, nunca ofuscá-las.

---

## 5. Design

### 5.1 Paleta de cores

| Papel | Direção |
|---|---|
| Fundo principal | Azul-marinho bem escuro (nunca preto puro) |
| Fundo de cards/seções | Levemente mais claro que o fundo principal |
| Texto principal | Branco levemente acinzentado (nunca branco puro) |
| Texto secundário | Cinza-azulado médio |
| Acento | Ciano/azul brilhante (estilo Miaki) |

No Tailwind, isso vira extensão de tema no `tailwind.config.ts` (`colors: { bg: ..., surface: ..., accent: ... }`), em vez de variáveis `:root` em CSS puro.

### 5.2 Tipografia
- Títulos e corpo: **Inter**
- Elementos tipo código/terminal: **JetBrains Mono**
- Combinação alternativa reservada para o futuro: Space Grotesk + Fira Code

---

## 6. Interações e animações

- **Scroll reveal**: elementos entram com fade + translateY conforme aparecem na tela, via Intersection Observer (hook `useInView`)
- **Hover em cards de projeto**: leve zoom na imagem
- **Hover em ícones de habilidades**: leve movimento/zoom
- **Modal de projeto**: centralizado, fundo escurecido, fecha com X ou clique fora, sem alterar posição de scroll

---

## 7. Responsividade

**Abordagem**: desktop primeiro, mas cada regra Tailwind já pensada para adaptação (usar classes flexíveis/grid do próprio Tailwind, evitar larguras fixas arbitrárias). Fase de breakpoints específicos (`sm:`, `md:`, `lg:`) acontece depois do desktop pronto.

---

## 8. Pontos em aberto

- Onde exatamente entra a Timeline no menu de navegação do Header (nova seção, precisa de link próprio)
- Detalhes finais do easter egg no console do DevTools (adiado)
- Refinamento visual do indicador "dominado vs. aprendendo agora" em Habilidades