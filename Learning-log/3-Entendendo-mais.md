# Guia de estudo — `layout.tsx` linha por linha, fontes do Next.js e `@theme` do Tailwind

Este documento reúne, em ordem, a explicação completa do `layout.tsx`, seguida das dúvidas específicas levantadas e suas respostas.

---

## Parte 1 — `layout.tsx`, linha por linha

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Fernando B Sebastião — Desenvolvedor Frontend",
  description: "Portfólio de Fernando B Sebastião, desenvolvedor frontend.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-body bg-primary text-text-primary`}>
        {children}
      </body>
    </html>
  );
}
```

### `import type { Metadata } from "next";`
Importa um **tipo** do Next.js (`type` sinaliza isso). `Metadata` é o "molde" que descreve quais informações uma página pode ter para SEO/navegador (título da aba, descrição). `import type`, em vez de um import normal, diz ao TypeScript "só preciso disso para checagem de tipo, não preciso do código de verdade" — deixa o pacote final mais leve, já que tipos não existem em tempo de execução.

### `import { Inter, JetBrains_Mono } from "next/font/google";`
São as funções que o Next.js oferece para carregar fontes do Google de forma otimizada (baixadas durante o build, servidas localmente).

### `import "./globals.css";`
Importa o CSS global direto no componente. Em projetos com bundlers modernos (Next.js, Vite), é comum importar CSS dentro de um arquivo `.tsx` — a ferramenta de build entende isso e injeta o CSS certo no HTML final. Importar dentro do `layout.tsx` garante que esse CSS seja aplicado ao site inteiro (o layout envolve tudo), sem precisar reimportar em cada página.

### `const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });`
Chama a função `Inter` (importada acima) e guarda o resultado na constante `inter`. `subsets: ["latin"]` baixa só o alfabeto latino (arquivo menor). `variable: "--font-inter"` é o nome da variável CSS que o Next vai gerar. A constante `inter` não é só a variável CSS — é um **objeto** com várias informações, incluindo a propriedade `.variable`, usada depois no `className`.

### `const jetbrainsMono = JetBrains_Mono({...});`
Mesma lógica, para a segunda fonte.

### `export const metadata: Metadata = { title: ..., description: ... };`
Convenção especial do Next.js: ao exportar uma constante chamada exatamente `metadata` de um `layout.tsx` ou `page.tsx`, o Next.js usa esse objeto automaticamente para preencher a tag `<title>` da aba e a meta tag `description` (importante para SEO). Nunca se escreve `<title>` manualmente — o Next faz isso por trás, a partir dessa exportação.

`: Metadata` é a anotação de tipo — diz ao TypeScript "esse objeto deve seguir o formato que o tipo `Metadata` descreve". Um erro de tipo (ex: `title: 123`) seria apontado na hora.

### `export default function RootLayout({ children }: { children: React.ReactNode }) {`
`export default` é obrigatório para o Next.js reconhecer o arquivo automaticamente (ver documento anterior sobre rotas). A parte entre parênteses mistura duas coisas:
- `{ children }` (antes dos dois-pontos) → **destructuring** (JavaScript puro): desempacota a propriedade `children` do objeto de props recebido, em vez de escrever `props.children`.
- `{ children: React.ReactNode }` (depois dos dois-pontos) → **tipagem** desse objeto de props (TypeScript): diz que o objeto recebido tem uma propriedade `children`, do tipo `React.ReactNode`.

### `return ( <html lang="pt"> ... </html> );`
O `return` de um componente React devolve o que será desenhado na tela (JSX). `lang="pt"` diz ao navegador e a leitores de tela que o conteúdo está em português — importante para acessibilidade e indexação no Google.

### `<body className={...}>`
A string dentro do `className` mistura duas coisas:
- `${inter.variable}` e `${jetbrainsMono.variable}`: usam a propriedade `.variable` dos objetos `inter`/`jetbrainsMono`. Geram classes especiais que **disponibilizam** as variáveis `--font-inter` e `--font-jetbrains` para serem usadas em qualquer lugar da página — sem elas, o `@theme` do `globals.css` não conseguiria "enxergar" essas variáveis.
- `font-body bg-primary text-text-primary`: classes utilitárias do Tailwind, geradas a partir do `@theme` — aplicam a fonte Inter, o fundo azul-marinho e o texto off-white em todo o `<body>`.

A **template string** (crases + `${}`) é usada porque `className` espera uma única string com classes separadas por espaço; ela permite misturar texto fixo com valores vindos de variáveis.

### `{children}`
É onde o conteúdo da rota atual (vindo do `page.tsx`, ou de um layout mais interno) é encaixado — a "foto" dentro da "moldura".

---

## Parte 2 — Onde as fontes são baixadas, de verdade

**Pergunta:** se `Inter(...)` é a chamada da função e `inter` é o objeto retornado, onde exatamente a fonte é baixada?

**Resposta:** o download acontece de forma escondida, durante o processo de build, no momento em que a função `Inter({...})` é chamada. Não existe uma linha explícita tipo `baixarFonte()` — o próprio ato de chamar `Inter(...)` já dispara, por trás dos panos, o processo de buscar os arquivos da fonte nos servidores do Google, guardá-los dentro do projeto, e gerar a variável CSS correspondente. Os arquivos ficam guardados dentro da pasta `.next` (criada automaticamente pelo Next.js).

**Pergunta:** por que existe uma função `Inter`, mas não existe uma função `Arial`?

**Resposta:** Arial e Times New Roman já vêm instaladas no computador de qualquer pessoa (fazem parte do sistema operacional) — nunca precisaram ser baixadas da internet. Por isso, para usá-las, basta escrever o nome direto no CSS:
```css
font-family: Arial, sans-serif;
```

Inter e JetBrains Mono são diferentes: **não** vêm instaladas por padrão em nenhum sistema. São fontes hospedadas no Google Fonts e precisam ser baixadas da internet para funcionar no site. Por isso — e só por isso — o Next.js oferece uma função para cada uma: a função existe para **automatizar o processo de baixar** aquela fonte específica.

**Resumo:** função em `next/font/google` = "essa fonte precisa ser baixada da internet, e a função automatiza isso". Fonte já instalada no sistema = usa-se direto pelo nome, sem função nenhuma.

---

## Parte 3 — Tailwind: quais classes são "de fábrica" e quais são nossas

**Pergunta:** `font-body`, `bg-primary`, `text-text-primary` são classes de fábrica do Tailwind, ou foram declaradas por nós?

**Resposta:** nenhuma delas é de fábrica — as três são nossas, criadas a partir do que foi escrito no `@theme`. "De fábrica" seriam classes como `bg-blue-500` ou `flex`, que já vêm prontas no Tailwind sem nenhuma declaração.

| Classe usada | Origem (linha declarada no `@theme`) | O que faz |
|---|---|---|
| `bg-primary` | `--color-primary: #0a0e17;` | Pinta o fundo com a cor azul-marinho escura |
| `text-text-primary` | `--color-text-primary: #e7eaf0;` | Pinta o texto com a cor off-white |
| `font-body` | `--font-body: var(--font-inter), sans-serif;` | Aplica a fonte Inter como padrão |

Cada classe usada no projeto tem uma linha correspondente, escrita por nós, no `globals.css` — nenhuma surge do nada.

---

## Parte 4 — Bloco `@theme` do `globals.css`, variável por variável

```css
--color-primary: #0a0e17;
```
Cria a cor `primary` (azul-marinho bem escuro). Gera `bg-primary`, `text-primary`, `border-primary`.

```css
--color-surface: #121826;
```
Cria a cor `surface` (tom mais claro, para fundos de cards). Gera `bg-surface`, `text-surface`, `border-surface`.

```css
--color-accent: #378add;
```
Cria a cor `accent` (o ciano de destaque). Gera `bg-accent`, `text-accent`, `border-accent`.

```css
--color-accent-dark: #042c53;
```
Versão escura do acento (para texto legível sobre fundo ciano). Gera `bg-accent-dark`, `text-accent-dark`.

```css
--color-border: #26314a;
```
Cor para bordas/divisórias. Gera `border-border` (nome repetido por coincidência de nomenclatura).

```css
--color-text-primary: #e7eaf0;
```
Texto principal (off-white). Gera `text-text-primary` (o "text" aparece duas vezes porque já está no nome da variável).

```css
--color-text-secondary: #9aa4b5;
```
Texto secundário (cinza-azulado, para descrições). Gera `text-text-secondary`.

```css
--font-body: var(--font-inter), sans-serif;
```
Fonte principal do site. Gera `font-body`.

```css
--font-mono: var(--font-jetbrains), monospace;
```
Fonte para elementos tipo código/terminal. Gera `font-mono`.

---

## Resumo final

| Dúvida | Conclusão |
|---|---|
| Onde a fonte é baixada? | No momento em que a função `Inter({...})` é chamada, durante o build — arquivos ficam guardados em `.next` |
| Por que existe função `Inter` mas não `Arial`? | Inter precisa ser baixada da internet (Google Fonts); Arial já vem no sistema operacional |
| `font-body`/`bg-primary`/`text-text-primary` são de fábrica? | Não — todas vêm de linhas declaradas por nós no `@theme` |
| Como saber a origem de uma classe Tailwind customizada? | Procurar a variável correspondente no `@theme` (mesmo nome, com o prefixo `--color-` ou `--font-`) |