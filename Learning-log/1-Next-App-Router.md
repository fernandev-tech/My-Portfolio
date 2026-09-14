# Guia de estudo — Next.js App Router: rotas, `page.tsx`, `layout.tsx` e `export default`

Este documento reúne, em forma de perguntas e respostas, o que foi entendido sobre como o Next.js organiza páginas e rotas — para consulta e revisão futura.

---

## 1. Qual a diferença entre React puro e Next.js na forma de organizar páginas?

**React puro (Vite, Create React App):** não tem sistema de rotas embutido. Você cria componentes livremente (`Header.tsx`, `Hero.tsx`) e decide manualmente onde cada um aparece, normalmente tudo dentro de um `App.tsx` central. Não existe conceito nativo de "página" ou "rota" — para ter múltiplas páginas, seria preciso instalar uma biblioteca externa (React Router) e configurar tudo manualmente.

**Next.js (App Router):** a estrutura de pastas dentro de `app/` **é** o sistema de rotas. Cada pasta representa um segmento de URL, e certos nomes de arquivo dentro dela têm significado especial e obrigatório — não são "só mais um componente", são **convenções que o framework reconhece automaticamente**.

---

## 2. O que é `page.tsx`?

É o **conteúdo daquela rota específica**. Onde o arquivo está na árvore de pastas define a URL:

```
app/
  page.tsx              -> rota "/" (a home, a raiz do site)
  sobre/
    page.tsx             -> rota "/sobre"
  projetos/
    page.tsx             -> rota "/projetos"
    tarefas-app/
      page.tsx             -> rota "/projetos/tarefas-app"
```

O caminho de pastas até o `page.tsx` **é literalmente o endereço da URL** — sem precisar configurar rota nenhuma manualmente. É por isso que se chama **"roteamento baseado em arquivos"** (file-based routing).

Para um portfólio de página única, basta um `page.tsx` direto dentro de `app/`, representando a rota `/` — a única página do site.

---

## 3. O que é `layout.tsx`?

**Não tem relação com estilo/aparência** (apesar do nome "layout" sugerir isso em português). Estilo, cor e fonte continuam sendo sempre trabalho do CSS/Tailwind, em qualquer um dos dois arquivos.

`layout.tsx` é a **estrutura fixa** que envolve a página (ou páginas) daquela pasta e de todas as pastas dentro dela — o que permanece igual independentemente do conteúdo específico de cada rota. No layout raiz entram: a tag `<html>`, a tag `<body>`, as fontes carregadas, o CSS global importado.

**Analogia:** `layout.tsx` é a **moldura de um quadro** (fixa, não muda); `page.tsx` é a **foto** que vai dentro da moldura (o conteúdo específico daquela rota, que muda de página para página).

O `layout.tsx` recebe uma prop chamada `children`, que é exatamente o conteúdo do `page.tsx` (ou de um layout mais interno) sendo encaixado dentro dele — a moldura abraçando a foto.

---

## 4. Se houver várias rotas, o `layout.tsx` evita repetição?

Sim. Exemplo:

```
app/
  layout.tsx          -> moldura geral (Header, Footer, fontes, CSS)
  page.tsx             -> conteúdo da rota "/"
  projetos/
    page.tsx            -> conteúdo da rota "/projetos"
  contato/
    page.tsx            -> conteúdo da rota "/contato"
```

O `layout.tsx` da raiz envolve automaticamente todas essas páginas — sem precisar escrever `<html>`, importar fontes, ou repetir Header/Footer em cada `page.tsx` individualmente. Escreve-se uma vez, no layout raiz, e toda rota "por baixo" dele herda automaticamente.

(É possível ter layouts aninhados também — um `layout.tsx` dentro de uma subpasta se aplicaria só às páginas daquela subpasta, empilhando-se por cima do layout raiz. Não necessário num portfólio de página única.)

---

## 5. O que é, exatamente, uma "rota"?

Uma **rota** é qualquer pasta dentro de `app/` que contenha um `page.tsx`. Essa presença de `page.tsx` é o que identifica a pasta como uma rota válida.

O `layout.tsx` é **opcional** em cada pasta — só a pasta raiz (`app/`) é obrigada a ter um. Uma subpasta pode ter só `page.tsx`, sem `layout.tsx` próprio, e ainda assim ser uma rota válida — nesse caso, ela simplesmente herda o layout mais próximo acima dela na árvore (no mínimo, o da raiz).

**Definição resumida:** rota = pasta que representa um endereço de URL, identificada pela presença de um `page.tsx` dentro dela; o caminho de pastas até ali é o próprio endereço da URL.

---

## 6. Por que `page.tsx` e `layout.tsx` exigem especificamente `export default`?

**Analogia do correio automático:** o Next.js funciona como um sistema de correio automático que passa por cada pasta do projeto recolhendo "cartas". Ele não lê o conteúdo da carta para saber do que se trata — ele só sabe: "toda pasta que tiver um `page.tsx`, eu pego a carta que estiver dentro do **envelope padrão**" (isso é o `export default`). Ele está programado para procurar especificamente esse envelope, não qualquer envelope com etiqueta personalizada.

Usar `export function Home()` (exportação nomeada) é como colocar a carta num envelope com etiqueta personalizada escrita à mão. O carteiro automático não sabe ler etiquetas personalizadas — só reconhece o envelope padrão. Resultado: ele chega na pasta, procura o envelope padrão, não encontra, e dá erro ("não encontrei componente nenhum aqui").

**Por que isso difere de importar um componente normal manualmente (ex: `import { Header } from './Header'`)?**
Porque, nesse caso, é o próprio desenvolvedor quem escreve o `import`, dizendo explicitamente "vai lá no arquivo Header e pega a coisa chamada Header" — ele sabe o nome, então pode pedir por ele. Já o Next.js, ao escanear automaticamente `page.tsx`/`layout.tsx` de todas as pastas do projeto, nunca escreveu manualmente "importa a coisa chamada X" — ele só sabe fazer isso de forma genérica e automática, e essa automação só funciona com exportação padrão (só pode haver uma por arquivo, o que remove ambiguidade).

---

## 7. E os outros arquivos/componentes — também precisam de `export default`?

Não, obrigatoriamente não. A regra de `export default` é **só para os arquivos especiais do Next.js** (`page.tsx`, `layout.tsx`, e outros que o framework reconhece automaticamente, como `loading.tsx` ou `error.tsx`).

Para componentes criados livremente em `src/components/` (Header, Hero, Skills, ProjectCard, etc.), a escolha é do desenvolvedor — pode ser `export default` ou exportação nomeada, porque é o próprio desenvolvedor quem escreve o `import` depois, sabendo o nome que deu.

**Convenção recomendada** (usada no Header do projeto): exportação nomeada (`export function Header() {}`), porque deixa mais claro, ao ler o código de outro arquivo, exatamente o que está sendo importado — e evita que desenvolvedores diferentes deem nomes diferentes ao importar o mesmo componente, o que confundiria a leitura do projeto ao longo do tempo.

---

## Resumo final

| Arquivo/local | Exigência de exportação | Motivo |
|---|---|---|
| `page.tsx` | `export default` obrigatório | Next.js importa automaticamente, sem saber o nome da função |
| `layout.tsx` | `export default` obrigatório | Mesma razão — importação automática pelo framework |
| Componentes em `src/components/` | Livre (nomeada recomendada) | Importados manualmente pelo próprio desenvolvedor, que já sabe o nome |

| Conceito | Definição resumida |
|---|---|
| Rota | Pasta dentro de `app/` que contém um `page.tsx`; o caminho de pastas é o endereço da URL |
| `page.tsx` | Conteúdo específico daquela rota |
| `layout.tsx` | Estrutura fixa que envolve a rota (e subrotas), evitando repetição entre páginas |