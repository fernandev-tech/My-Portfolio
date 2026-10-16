# Learning Log: Props, funções como props e o refactor do `ProjectCard`

**Data:** 14 de outubro de 2026
**Projeto:** Portfólio (Next.js + TypeScript + Tailwind)
**Contexto:** a seção Projetos tinha o mesmo bloco de JSX escrito duas vezes (um por `.map()`). Extraí esse bloco para um componente próprio, o `ProjectCard`.

---

## 1. Separar dados de interface

Antes, o `Projects.tsx` guardava os dados dos projetos **e** desenhava a seção. Agora cada arquivo tem uma função só:

- `src/lib/projects.ts` guarda os dados: o tipo `Project`, o tipo `ProjectContentBlock` e o array `projects`. Não tem JSX, por isso é `.ts` e não `.tsx`, e não precisa de `"use client"`.
- `Projects.tsx` só desenha, importando os dados com `import { projects, type Project } from "@/lib/projects"`.

**Analogia:** a lista de convidados (dados) é separada do plano da festa (interface). A lista pode crescer sem mexer no plano.

**Na prática:** para adicionar um terceiro projeto, só acrescento um objeto no `projects.ts`.

**Detalhe de nome:** o tipo de **um** projeto chama-se `Project` (singular). Antes estava `Projects`, igual ao nome do componente, o que confundia a leitura.

---

## 2. O que é o `ProjectCard` e para que serve

É um componente que sabe desenhar **um único card**. Não sabe nada sobre listas.

**Analogia:** o `ProjectCard` é o molde de bolacha. O `Projects.tsx` decide quantas bolachas fazer e com que massa.

O `.map()` faz duas coisas diferentes:

1. Percorrer a lista ("para cada projeto...") fica no `Projects.tsx`, porque é ele que tem a lista.
2. Desenhar o card ("...desenha isto") passou para o `ProjectCard`.

---

## 3. Props

Props são as coisas que um componente recebe de fora. Um componente é uma função, e props são os seus argumentos.

```tsx
type SaudacaoProps = {
  nome: string,
}

function Saudacao({ nome }: SaudacaoProps) {
  return <p>Olá, {nome}!</p>
}

<Saudacao nome="Fernando" />
<Saudacao nome="Maria" />
```

A "receita" é escrita uma vez e desenha coisas diferentes conforme o que recebe.

`{ nome }: SaudacaoProps` faz duas coisas ao mesmo tempo, o mesmo padrão do `{ children }: { children: React.ReactNode }` do `layout.tsx`:

- as chaves `{ }` **desempacotam** a prop numa variável (destructuring)
- o `: SaudacaoProps` **tipa** esse objeto

---

## 4. As props do `ProjectCard`

```tsx
type ProjectCardProps = {
    project: Project,
    onViewDetails: () => void,
}
```

O `type` é a lista de ingredientes que o card precisa receber.

- `project: Project`: o nome da prop é `project` (minúsculo, o dado) e o tipo é `Project` (maiúsculo, o molde que descreve o formato).
- `onViewDetails: () => void`: uma função que o card chama quando o botão "Detalhes" é clicado.

---

## 5. Funções são valores

Em JavaScript, uma função pode ser guardada numa variável, entregue a outro componente e chamada mais tarde.

```tsx
const dizerOla = () => {
    console.log("Olá!")
}

dizerOla     // a função em si (pode ser guardada e entregue)
dizerOla()   // executar a função agora
```

**Regra dos parênteses:**

- sem parênteses → entrego a função, quem a recebe chama quando quiser
- com parênteses → executo a função agora

Por isso é `onClick={onViewDetails}` e **não** `onClick={onViewDetails()}`. A segunda forma executaria a função ao desenhar o card, e o modal abriria logo ao carregar a página.

---

## 6. Como ler `() => void`

```
   ()      =>      void
    │       │        │
 o que    "devolve"  o que ela
 ela                 devolve
 recebe
```

- `()` vazio: não recebe nada
- `=>`: separa o que entra do que sai
- `void`: não devolve nada, só faz uma ação

Outros exemplos:

```tsx
() => void                          // não recebe nada, não devolve nada
(id: string) => void                // recebe um texto, não devolve nada
(a: number, b: number) => number    // recebe dois números, devolve um número
```

---

## 7. Por que o card precisa de receber uma função (callback prop)

Os dados descem do pai para o filho por props:

```
Projects (pai) ──── project ────► ProjectCard (filho)
```

Mas o botão "Detalhes" está **dentro** do card, e quem controla o modal é o `selectedProject`, um `useState` **do pai**. O filho não pode mexer no estado do pai.

A solução é o pai entregar uma função ao filho, e o filho só a chama:

```
Projects (pai) ─── project ──────────► ProjectCard (filho)
               ─── onViewDetails ───►  (guarda a função)
                                            │
                       utilizador clica ◄───┘
                                            │
               ◄─── onViewDetails() ────────┘
       │
   corre o código que o pai escreveu
   (setSelectedProject(project))
```

**A informação sobe através de uma função.** Este padrão chama-se **callback prop**.

**Analogia:** o card é um botão de campainha, e a campainha toca noutra sala. O pai entrega ao card um fio ligado à campainha. O card só carrega no botão.

---

## 8. Quem escreve o quê

**No pai (`Projects.tsx`)** escrevo **o que** a função faz:

```tsx
<ProjectCard
    key={project.name}
    project={project}
    onViewDetails={() => setSelectedProject(project)}
/>
```

Aqui crio uma função nova (por isso tem parênteses e seta) e entrego ao card com o nome `onViewDetails`.

**No filho (`ProjectCard.tsx`)** só decido **quando** a função é chamada:

```tsx
<button onClick={onViewDetails}>Detalhes</button>
```

O card não sabe o que a função faz. Isto permite reutilizar o mesmo card noutro sítio, com outro comportamento, sem mudar uma linha dentro dele.

---

## 9. A `key` fica no `.map()`, não dentro do card

A `key` serve para o React identificar cada item de uma lista. Por isso fica onde o `.map()` está (no `Projects.tsx`) e foi retirada do `<div>` de fora do card. Dentro do card, o `.map()` das tags continua com a sua própria `key={projectTag}`.

---

## 10. O `Projects.tsx` depois do refactor

```tsx
import { ProjectCard } from "./ProjectCard"

// dentro do return:
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {featuredProjects.map(project => (
        <ProjectCard
            key={project.name}
            project={project}
            onViewDetails={() => setSelectedProject(project)}
        />
    ))}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {showMore && moreProjects.map(project => (
        <ProjectCard
            key={project.name}
            project={project}
            onViewDetails={() => setSelectedProject(project)}
        />
    ))}
</div>
```

- `./ProjectCard` significa "na mesma pasta que este arquivo"
- as chaves no import são porque o card usa exportação nomeada (`export function`)
- o `import Image from "next/image"` continua necessário no `Projects.tsx`, porque o modal ainda usa `<Image>`

---

## Resumo em quatro frases

1. Funções são valores: posso guardá-las, entregá-las e chamá-las depois.
2. `() => void` descreve uma função sem parâmetros e sem retorno.
3. Os dados descem do pai para o filho por props. Os avisos sobem do filho para o pai chamando funções que o pai entregou.
4. O pai decide **o que** a função faz. O filho decide **quando** a chama.

---

## Para aprofundar mais tarde

- [ ] Funções com parâmetros em props, por exemplo `onToggleFavorite: (name: string) => void`
- [ ] Quando extrair um componente (regra prática: quando o mesmo JSX aparece duas vezes)
- [ ] `relative` / `absolute` / `fixed` (necessário para o modal)

## Próximos passos no portfólio

1. Corrigir o bug da lista (`format === "list"`) dentro do modal
2. Renderizar o `howIBuilt` no modal (hoje só o `description` aparece)
3. Estilizar o modal: centralizado, fundo escurecido, imagem e texto organizados
4. Botão X para fechar e botões "Ver Código" / "Visitar Projeto" dentro do modal