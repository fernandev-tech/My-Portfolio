# Guia de estudo — Tailwind, `globals.css`, `layout.tsx` e classes utilitárias

Este documento reúne, em ordem, as perguntas feitas e as respostas que ajudaram a entender como o Tailwind CSS v4 funciona dentro do projeto Next.js, e como `globals.css` e `layout.tsx` se conectam.

---

## 1. O que é uma "classe utilitária"?

**Como era em React + CSS puro (antes):**

```css
/* Header.module.css */
.botaoCV {
  background-color: var(--accent);
  padding: 0.5rem 1rem;
  border-radius: 8px;
}
```
```tsx
<button className={styles.botaoCV}>Download CV</button>
```

O nome da classe (`botaoCV`) era inventado pelo desenvolvedor, e cada propriedade CSS que ela deveria aplicar era **escrita manualmente**, numa regra CSS própria.

**Como é no Tailwind:**

```tsx
<button className="bg-accent px-4 py-2 rounded-lg">Download CV</button>
```

Sem arquivo `.css` nenhum para esse botão. Cada palavra dentro de `className` já é uma **classe pronta**, que o Tailwind criou, e cada uma faz **uma coisa só**:
- `bg-accent` → aplica `background-color`
- `px-4` → aplica `padding` horizontal
- `py-2` → aplica `padding` vertical
- `rounded-lg` → aplica `border-radius`

Por isso se chama "classe utilitária": cada classe é uma ferramenta pequena e específica ("utilidade"), e várias são empilhadas direto na tag, em vez de escrever uma regra CSS grande com várias propriedades juntas.

---

## 2. Classe ou propriedade — qual a diferença?

Uma **classe** (ex: `bg-primary`) é só um **nome** usado no `className`. Sozinha, ela não faz nada visualmente — é um rótulo. O que causa o efeito visual é a **regra CSS** que o Tailwind gera, escondida, associada a esse nome:

```css
.bg-primary {
  background-color: #0a0e17;
}
```

`bg-primary` é a **classe** (a "embalagem"); `background-color` é a **propriedade CSS** que está **dentro** dela, fazendo o trabalho de verdade. Escrever `className="bg-primary"` no JSX é equivalente a escrever essa regra CSS manualmente e aplicá-la — só que o Tailwind já a gerou automaticamente, a partir do que foi declarado no `@theme`.

---

## 3. O que muda de fábrica vs. o que é customizado

O Tailwind já vem, por padrão, com milhares de classes prontas (`flex`, `p-4`, `text-center`, `rounded-lg`, `bg-blue-500`, etc.), baseadas numa paleta de cores e escala de espaçamento **genéricas** dele — cores que não são as cores do projeto.

O `@theme`, dentro do `globals.css`, serve para **adicionar** cores e fontes próprias a essa lista. Ao escrever:
```css
--color-primary: #0a0e17;
```
diz-se ao Tailwind: "além das cores de fábrica, cria também uma cor nova chamada `primary`, com esse valor." O Tailwind, ao processar isso, gera automaticamente (nos bastidores) as classes `bg-primary`, `text-primary`, `border-primary` — com a cor do projeto.

**Nunca se escreve a classe `bg-primary` em lugar nenhum** — só se diz ao Tailwind qual valor ela deve ter, e ele cria a classe pronta para uso.

---

## 4. O prefixo (`--color-`, `--font-`) importa

O Tailwind olha o início do nome de cada variável para decidir que tipo de classe gerar:

- `--color-primary` → é reconhecido como cor → gera `bg-primary`, `text-primary`, `border-primary`
- `--font-body` → é reconhecido como fonte → gera `font-body`

Sem o prefixo certo (ex: só `--primary`, sem `color-`), o Tailwind não sabe que tipo de classe criar, e **não gera nenhuma classe** a partir dela. O prefixo é a "etiqueta" que diz ao Tailwind qual família de classes produzir.

---

## 5. `globals.css` explicado, linha por linha

```css
@import "tailwindcss";

@theme {
  --color-primary: #0a0e17;
  --color-surface: #121826;
  --color-accent: #378add;
  --color-accent-dark: #042c53;
  --color-border: #26314a;
  --color-text-primary: #e7eaf0;
  --color-text-secondary: #9aa4b5;

  --font-body: var(--font-inter), sans-serif;
  --font-mono: var(--font-jetbrains), monospace;
}
```

**`@import "tailwindcss";`**
Liga o Tailwind inteiro no projeto — substitui as antigas três linhas (`@tailwind base; @tailwind components; @tailwind utilities;`) usadas na v3. Traz o reset embutido (parecido com o `reset.css` escrito manualmente no projeto anterior em React, mas já pronto) e todo o motor de geração de classes utilitárias.

**`@theme { ... }`**
Diretiva exclusiva do Tailwind onde se declaram variáveis de design próprias (cores, fontes), para que o Tailwind gere classes a partir delas.

**Diferença em relação ao `:root { --accent: ... }` do projeto anterior (React + CSS puro):** lá, a variável só existia para uso manual com `var(--accent)` em cada regra CSS escrita à mão. Aqui, dentro do `@theme`, o Tailwind lê a variável e **cria classes prontas automaticamente** — sem precisar escrever nenhum CSS extra.

**As linhas de cor** (ex: `--color-primary: #0a0e17;`) criam um valor **novo e original** — não usam `var()` porque não estão lendo nenhuma variável já existente.

**As linhas de fonte** usam `var()` porque estão **lendo** variáveis que já existem, criadas pelo Next.js:
```css
--font-body: var(--font-inter), sans-serif;
```
`--font-inter` foi criada no `layout.tsx` (ver seção 6). Aqui, o valor dela é lido com `var()` e reempacotado sob o nome `--font-body`, que o Tailwind reconhece pelo prefixo `--font-`. O `, sans-serif` no final é o *fallback*: se a fonte Inter não carregar, o navegador usa a fonte padrão do sistema.

---

## 6. `layout.tsx` — de onde vêm as variáveis de fonte

```tsx
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
```

O Next.js baixa a fonte Inter e cria, automaticamente, uma variável CSS chamada `--font-inter`, contendo o nome técnico real da fonte carregada. Essa variável passa a existir **antes** do `globals.css` ser processado, e é ela que o `@theme` lê com `var(--font-inter)`.

---

## 7. O ciclo completo entre `layout.tsx` e `globals.css`

1. **`layout.tsx` fornece o dado bruto** — `Inter({ variable: "--font-inter" })` cria a variável `--font-inter` (a fonte baixada).
2. **`globals.css` nomeia e organiza esse dado** — dentro do `@theme`, `--font-body: var(--font-inter), sans-serif;` lê essa variável e a "empacota" sob um nome que o Tailwind reconhece.
3. **O Tailwind transforma isso em classes prontas** — gera `font-body`, `bg-primary`, `text-primary`, etc., nos bastidores, sem que ninguém escreva CSS manualmente para elas.
4. **`layout.tsx` volta a usar essas classes**, no `className` do `<body>` (`className="font-body bg-primary text-primary"`), aplicando o visual final.

Os dois arquivos "conversam" através dessas variáveis CSS — essa é a ponte que os conecta.

---

## 8. Sinais visuais do editor que não são erro

**Cores destacadas em vermelho (ou outra cor) num valor hexadecimal** (ex: `#0a0e17`) dentro do `globals.css`: isso é apenas **syntax highlighting** — o editor reconhece aquilo como um valor de cor e o destaca visualmente (às vezes até mostrando uma bolinha com a cor real ao lado). Não é erro.

**Como diferenciar de um erro de verdade:** um erro real aparece como um **sublinhado ondulado** (vermelho ou amarelo) sob o trecho problemático, ou como uma mensagem concreta no terminal (`npm run dev`) ou no navegador. Se nenhum desses dois aparecer, é só destaque visual, sem problema.

**A letra `M` (e um número) no painel de controle de versão (Git) do editor:** `M` significa **"Modified"** — o arquivo já existia num commit anterior e foi alterado desde então (diferente de `U`, "Untracked", que seria um arquivo novo que o Git ainda não conhece). O número ao lado costuma representar a quantidade de linhas alteradas. É informação normal, não indica problema.

---

## Resumo final

| Conceito | Definição resumida |
|---|---|
| Classe utilitária | Classe pronta do Tailwind que aplica uma única propriedade CSS (ex: `bg-accent` → `background-color`) |
| Classe vs. propriedade | Classe é o nome usado no `className`; propriedade é a regra CSS escondida por trás dela |
| `@theme` | Onde se declaram cores/fontes próprias para o Tailwind gerar classes automaticamente |
| Prefixo (`--color-`, `--font-`) | Diz ao Tailwind que tipo de classe gerar a partir da variável |
| `var()` no `@theme` | Usado para **ler** uma variável já existente (ex: fonte criada pelo Next.js), não para criar um valor novo |
| Ciclo `layout.tsx` ↔ `globals.css` | `layout.tsx` cria variável → `globals.css` lê e nomeia → Tailwind gera classe → `layout.tsx` usa a classe |
| Cor destacada no editor | Syntax highlighting, não é erro |
| `M` no Git | Arquivo modificado desde o último commit, não é erro |