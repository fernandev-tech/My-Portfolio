# 📚 Learning Log — Modelagem de Conteúdo com Múltiplos Formatos

> **Tema:** Modelagem de dados para conteúdo dinâmico em React + TypeScript
> **Projeto:** Portfólio pessoal
> **Contexto:** `AboutMe` → `Projects`
> **Conceitos principais:** Arrays, `.map()`, Union Types, Discriminated Unions, Type Narrowing e modelagem de dados

---

# 1. Contexto

Durante a construção do meu portfólio, percebi que precisava armazenar conteúdos textuais dentro dos projetos.

Um projeto possui informações como:

* nome;
* descrição curta;
* tecnologias;
* imagem;
* links;
* descrição detalhada;
* como o projeto foi construído.

Inicialmente, pensei em reutilizar a mesma estrutura que já tinha utilizado na seção `AboutMe`.

Foi justamente ao tentar fazer isso que percebi uma diferença importante entre os dois casos.

---

# 2. Estrutura que eu já tinha no AboutMe

Na seção `AboutMe`, criei o seguinte tipo:

```ts
type AboutTabs = {
    id: string,
    label: string,
    content: string[],
    format: "list" | "paragraph",
}
```

A estrutura utilizada era:

```ts
const aboutTabs: AboutTabs[] = [
    {
        id: "formacao-academica",
        label: "Formação Acadêmica",
        content: [
            "Iniciei meus estudos no Ensino Médio...",
            "Durante esse período, aprofundei conhecimentos..."
        ],
        format: "paragraph",
    },

    {
        id: "formacao-profissional",
        label: "Formação Profissional",
        content: [
            "Oratória",
            "Informática Básica",
            "Pacote Office"
        ],
        format: "list",
    },
]
```

Aqui existe uma característica importante:

> Cada `tab` possui apenas um formato para todo o seu conteúdo.

Por exemplo:

```ts
{
    content: ["Português", "Inglês"],
    format: "list"
}
```

significa:

> Todo o conteúdo desse tab será renderizado como lista.

Enquanto:

```ts
{
    content: [
        "Primeiro parágrafo...",
        "Segundo parágrafo..."
    ],
    format: "paragraph"
}
```

significa:

> Todo o conteúdo desse tab será renderizado como parágrafos.

---

# 3. Como o AboutMe é renderizado

No JSX utilizei:

```tsx
{contentTab?.format === "list" ? (
    <ul>
        {contentTab.content.map((item, index) => (
            <li key={index}>
                {item}
            </li>
        ))}
    </ul>
) : (
    contentTab?.content.map((paragrafo, index) => (
        <p key={index}>
            {paragrafo}
        </p>
    ))
)}
```

A lógica é:

```text
contentTab
    ↓
verifica o format
    ↓
"list" → transforma os conteúdos em <li>
"paragraph" → transforma os conteúdos em <p>
```

Essa estrutura funcionava perfeitamente para o `AboutMe`.

---

# 4. O novo problema no Projects

No projeto `Task Flow React`, percebi que a descrição precisava ser mais rica.

Por exemplo:

```text
Parágrafo

Parágrafo

Título "Funcionalidades"

Lista
- Criar tarefas
- Editar tarefas
- Excluir tarefas
- Favoritar tarefas

Parágrafo
```

Ou seja, a descrição não possui apenas um formato.

Ela possui uma **sequência de diferentes formatos**.

A estrutura mental passou a ser:

```text
description
│
├── paragraph
├── paragraph
├── title
├── list
└── paragraph
```

Isso é diferente do `AboutMe`.

---

# 5. O primeiro raciocínio que tive

Inicialmente pensei em fazer algo parecido com:

```ts
description: string[],
format: "list" | "paragraph"
```

Mas percebi que isso não representava corretamente os dados.

Essa estrutura significaria:

```text
description inteiro
    ↓
um único format
    ↓
LISTA OU PARÁGRAFOS
```

Mas o que eu realmente precisava era:

```text
description
    ↓
vários blocos
    ↓
cada bloco possui seu próprio formato
```

Essa foi a principal mudança de raciocínio.

---

# 6. Nova modelagem

Foi criado o conceito de `ProjectContentBlock`.

```ts
type ProjectContentBlock =
    | {
        format: "paragraph";
        content: string;
    }
    | {
        format: "title";
        content: string;
    }
    | {
        format: "list";
        content: string[];
    };
```

Agora cada elemento do conteúdo possui seu próprio formato.

Por exemplo:

```ts
description: [
    {
        format: "paragraph",
        content: "O React Task Flow é uma aplicação web..."
    },

    {
        format: "paragraph",
        content: "Mais do que construir uma To-Do List..."
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
            "Marcar tarefas como concluídas"
        ]
    },

    {
        format: "paragraph",
        content: "Este projeto também me ajudou..."
    }
]
```

---

# 7. O novo modelo mental

A diferença pode ser visualizada assim.

## AboutMe

```text
TAB
│
├── content[]
│
└── format
      │
      ├── list
      └── paragraph
```

O formato pertence ao conteúdo inteiro.

---

## Projects

```text
DESCRIPTION[]
│
├── BLOCK
│   ├── format: paragraph
│   └── content: string
│
├── BLOCK
│   ├── format: paragraph
│   └── content: string
│
├── BLOCK
│   ├── format: title
│   └── content: string
│
├── BLOCK
│   ├── format: list
│   └── content: string[]
│
└── BLOCK
    ├── format: paragraph
    └── content: string
```

Agora cada bloco decide como deve ser renderizado.

---

# 8. Union Type

Um dos conceitos novos que apareceu foi **Union Type**.

No TypeScript:

```ts
type ProjectContentBlock =
    | Paragraph
    | Title
    | List;
```

significa que `ProjectContentBlock` pode representar diferentes tipos.

No meu caso:

```ts
type ProjectContentBlock =
    | {
        format: "paragraph";
        content: string;
    }
    | {
        format: "title";
        content: string;
    }
    | {
        format: "list";
        content: string[];
    };
```

O símbolo:

```ts
|
```

significa **OU**.

Portanto:

```text
ProjectContentBlock
    ↓
paragraph
OU
title
OU
list
```

---

# 9. Discriminated Union

Aqui apareceu um conceito ainda mais específico:

**Discriminated Union**.

O campo:

```ts
format
```

funciona como o **discriminador**.

Por exemplo:

```ts
{
    format: "paragraph",
    content: "Texto..."
}
```

e:

```ts
{
    format: "list",
    content: [
        "Item 1",
        "Item 2"
    ]
}
```

O TypeScript consegue olhar para:

```ts
format
```

e descobrir qual tipo de objeto está sendo utilizado.

Podemos pensar assim:

```text
format: "paragraph"
        ↓
content é string

format: "title"
        ↓
content é string

format: "list"
        ↓
content é string[]
```

Isso permite que o TypeScript nos ajude durante a implementação.

---

# 10. Type Narrowing

Outro conceito que apareceu foi **Type Narrowing**.

No JSX:

```tsx
{project.description.map((block, index) => {

    if (block.format === "paragraph") {
        return <p key={index}>{block.content}</p>
    }

    if (block.format === "title") {
        return <h3 key={index}>{block.content}</h3>
    }

    if (block.format === "list") {
        return (
            <ul key={index}>
                {block.content.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        )
    }
})}
```

Quando faço:

```ts
if (block.format === "list")
```

o TypeScript entende que naquele ponto `block` é especificamente o tipo:

```ts
{
    format: "list";
    content: string[];
}
```

Por isso posso fazer:

```ts
block.content.map(...)
```

sem precisar dizer manualmente ao TypeScript que `content` é um array.

Isso é **Type Narrowing**:

> O TypeScript reduz um tipo mais amplo para um tipo mais específico com base nas verificações que fazemos.

---

# 11. O papel do map()

Também revi e aprofundei o entendimento de `.map()`.

O `map()` percorre o array **mantendo a ordem original dos elementos**.

Por exemplo:

```ts
description: [
    paragraph,
    paragraph,
    title,
    list,
    paragraph
]
```

O `map()` processa exatamente nessa ordem:

```text
1 → paragraph
2 → paragraph
3 → title
4 → list
5 → paragraph
```

Portanto, não preciso repetir:

```ts
if (block.format === "paragraph")
```

para cada parágrafo.

Tenho apenas uma condição para o formato `paragraph`:

```ts
if (block.format === "paragraph") {
    return <p>{block.content}</p>
}
```

Se existirem três parágrafos no array, o `map()` encontrará cada um deles e executará essa mesma lógica três vezes.

---

# 12. Exemplo completo

Uma descrição pode ser:

```ts
description: [
    {
        format: "paragraph",
        content: "O React Task Flow é uma aplicação web de gerenciamento de tarefas criada com React e Vite."
    },

    {
        format: "paragraph",
        content: "Mais do que construir uma To-Do List, utilizei este projeto como um laboratório prático para aprofundar meus conhecimentos em React."
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
            "Transição animada entre as diferentes listas"
        ]
    },

    {
        format: "paragraph",
        content: "O projeto também foi importante para compreender melhor a organização de componentes, estado e persistência de dados."
    }
]
```

O renderer permanece o mesmo.

---

# 13. Relação entre dados e UI

Um dos aprendizados mais importantes desta situação foi perceber que a estrutura dos dados pode determinar como a interface será construída.

Em vez de colocar HTML diretamente dentro dos dados, estou armazenando informações estruturadas:

```text
Dados
 ↓
format
 ↓
Renderer
 ↓
HTML correspondente
```

Exemplo:

```text
format: "paragraph"
        ↓
       <p>

format: "title"
        ↓
       <h3>

format: "list"
        ↓
       <ul>
```

Isso permite separar:

**Conteúdo**

de

**Forma como o conteúdo é apresentado.**

---

# 14. Aplicação no meu portfólio

A estrutura será utilizada nos projetos do meu portfólio.

O tipo `Projects` poderá ter:

```ts
type Projects = {
    name: string;
    shortDescription: string;
    typeProject: "Web" | "Mobile";
    year: string;
    tags: string[];
    image: string;
    viewProject: string;
    viewCode: string;
    description: ProjectContentBlock[];
    howIBuilt: ProjectContentBlock[];
    featured: boolean;
};
```

Tanto:

```ts
description
```

quanto:

```ts
howIBuilt
```

podem utilizar a mesma estrutura de blocos.

Isso evita criar um tipo diferente para cada seção quando ambas possuem a mesma necessidade estrutural.

---

# 15. O principal raciocínio que aprendi

O ponto mais importante desta aprendizagem não foi simplesmente aprender a escrever:

```ts
type ProjectContentBlock = ...
```

O mais importante foi aprender a **identificar a estrutura do problema**.

Eu já conhecia:

```ts
string[]
```

e já sabia fazer:

```ts
.map()
```

Também já tinha utilizado:

```ts
format: "list" | "paragraph"
```

no `AboutMe`.

O novo passo foi perceber que o problema havia mudado.

Antes:

```text
Um conteúdo → um formato
```

Agora:

```text
Um conteúdo → vários blocos → cada bloco possui um formato
```

Portanto, a solução não era adicionar mais condições ao modelo antigo.

Era **mudar a modelagem dos dados**.

---

# 16. Regra mental para situações futuras

Quando encontrar uma situação parecida, devo perguntar:

### Pergunta 1

> O formato pertence ao conteúdo inteiro?

Se sim, uma estrutura como:

```ts
content: string[];
format: "list" | "paragraph";
```

pode ser suficiente.

### Pergunta 2

> Existem diferentes tipos de conteúdo misturados na mesma sequência?

Se sim, provavelmente preciso de algo como:

```ts
content: ContentBlock[];
```

onde cada bloco possui seu próprio discriminador:

```ts
{
    format: "...",
    content: ...
}
```

### Pergunta 3

> O conteúdo de cada formato possui uma estrutura diferente?

Se sim, posso utilizar uma **Discriminated Union**.

---

# 17. Resumo dos conceitos

| Conceito            | Onde apareceu                 | O que aprendi                                                  |
| ------------------- | ----------------------------- | -------------------------------------------------------------- |
| `string[]`          | `AboutMe`                     | Array de strings                                               |
| `.map()`            | `AboutMe` e `Projects`        | Percorrer elementos e gerar conteúdo                           |
| Union Type          | `ProjectContentBlock`         | Um tipo pode representar diferentes possibilidades             |
| Discriminated Union | `format`                      | O campo `format` identifica o tipo do bloco                    |
| Type Narrowing      | `if (block.format === "...")` | TypeScript identifica o tipo específico                        |
| Modelagem de dados  | `Projects`                    | Estruturar os dados de acordo com o problema                   |
| Renderer            | JSX dos projetos              | Transformar cada tipo de bloco no elemento HTML correspondente |

---

# 18. Conclusão

Esta aprendizagem mostrou uma evolução natural a partir de algo que eu já sabia.

No `AboutMe`, eu tinha uma estrutura simples:

```text
conteúdo
+
um formato
```

Nos projetos, precisei subir um nível:

```text
conteúdo
+
vários blocos
+
cada bloco com seu próprio formato
```

Não precisei abandonar o conhecimento anterior.

Apenas precisei perceber que o problema tinha ficado um pouco mais complexo e adaptar a modelagem.

A principal ideia que quero guardar é:

> **Antes de pensar no JSX, preciso pensar em como os dados realmente estão estruturados.**

Quando a modelagem representa corretamente o problema, o JSX fica muito mais simples de escrever.

---

## Próxima aplicação

Aplicar esta estrutura no meu portfólio:

1. Criar `ProjectContentBlock`.
2. Atualizar o tipo `Projects`.
3. Transformar `description` em `ProjectContentBlock[]`.
4. Transformar `howIBuilt` em `ProjectContentBlock[]`.
5. Criar o renderer dos blocos.
6. Testar diferentes sequências:

   * parágrafo → parágrafo → lista;
   * parágrafo → título → lista → parágrafo;
   * título → lista → título → parágrafo.
7. Depois melhorar a estilização de cada formato com Tailwind CSS.

**Objetivo:** entender a implementação e não apenas fazê-la funcionar.
