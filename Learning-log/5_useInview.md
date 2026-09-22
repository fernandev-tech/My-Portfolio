# Guia de estudo — hook `useInView` (useRef, useEffect, IntersectionObserver)

Este documento reúne a explicação completa de como o hook `useInView` funciona, conceito por conceito, na ordem em que foi construído.

## Código completo do hook

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function useInView() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
```

---

## Conceito 1 — `useRef`: apontar para um elemento real do DOM

**Definição técnica:** `useRef` cria uma referência mutável que persiste entre renderizações do componente, e que pode ser conectada a um elemento do DOM real através do atributo `ref` no JSX.

```tsx
const ref = useRef<HTMLElement>(null);
```

**Analogia:** pensa no `useRef` como uma **caixinha vazia**, criada agora, mas preenchida **depois**, automaticamente, pelo React. `null` é o valor inicial ("ainda não tenho nada aqui dentro").

**Por que é necessário:** até então, todo o JSX escrito é "abstrato" — o React cuida de criar os elementos reais na página, sem que seja preciso tocar neles diretamente. Mas o `IntersectionObserver` (Conceito 3) precisa de uma **referência direta** ao elemento HTML real na tela, para poder "vigiá-lo". O `ref` é a ponte entre o mundo do React (JSX, componentes) e o mundo real do navegador (elementos HTML concretos).

**O tipo TypeScript (`<HTMLElement>`):** diz que tipo de elemento aquela caixinha vai guardar. Para tags com comportamento próprio e específico (`<div>`, `<img>`, `<button>`, `<input>`), usa-se o tipo específico (`HTMLDivElement`, `HTMLImageElement`, `HTMLButtonElement`). Para tags "genéricas", sem propriedades especiais (`<section>`, `<span>`, `<article>`, `<header>`), usa-se o tipo genérico `HTMLElement` — essas tags não têm uma interface própria no navegador, diferente de um botão (que pode ser clicado) ou uma imagem (que tem `src`).

**Como se conecta a um elemento JSX de verdade:**
```tsx
<section ref={ref}>...</section>
```

---

## Conceito 2 — `useEffect`: rodar código depois que o componente aparece na tela

**Definição técnica:** `useEffect` é um hook que executa uma função depois que o React termina de desenhar (montar) o componente na tela — diferente do restante do código do componente, que roda durante a montagem, antes do elemento existir de fato.

```tsx
useEffect(() => {
  // código que roda depois que o componente é desenhado
}, []);
```

**Por que a distinção entre "antes" e "depois" importa:** o `IntersectionObserver` só pode vigiar um elemento que já existe fisicamente na página. Se o observer fosse criado antes do elemento estar desenhado, `ref.current` ainda seria `null` (a "caixinha" ainda vazia), e não haveria nada para vigiar.

**O array de dependências (`[]`) no final:** controla quando o React deve rodar o `useEffect` de novo.
- Array **vazio** (`[]`): "não depende de nada que mude — roda só uma vez, na primeira vez que o componente aparece, e nunca mais".
- Se contivesse algo, por exemplo `[isVisible]`, o efeito rodaria de novo toda vez que `isVisible` mudasse — o que não é desejado aqui, já que o observer só precisa ser configurado uma única vez.

---

## Conceito 3 — `IntersectionObserver`: a API do navegador que detecta visibilidade

**Definição técnica:** `IntersectionObserver` é uma API nativa do navegador (não é do React nem do Next.js) que observa quando um elemento entra ou sai da área visível da tela, sem precisar recalcular manualmente a posição de scroll.

```tsx
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    setIsVisible(true);
    observer.disconnect();
  }
});
```

**`new IntersectionObserver(...)`:** cria uma instância nova dessa ferramenta. Analogia: "um vigia recém-contratado, ainda sem saber o que vigiar" — isso só é definido depois, com `observer.observe(...)`.

**O argumento passado é uma função "callback":** roda toda vez que o estado de visibilidade do elemento observado muda. Essa função sempre recebe uma **lista** de "entradas" (`entries`), porque, tecnicamente, um mesmo observer pode vigiar vários elementos ao mesmo tempo, cada um gerando sua própria entrada.

**`([entry]) => { ... }` — por que colchetes:** é **destructuring de array** (a mesma técnica usada em `const [activeTab, setActiveTab] = useState(...)`). Como este hook vigia apenas um elemento por vez, `[entry]` desempacota diretamente o primeiro (e único) item da lista, evitando escrever `entries[0]` repetidamente.

**`entry.isIntersecting`:** um valor booleano dentro do objeto `entry` — `true` quando o elemento está, naquele momento, visível na área da tela (mesmo que parcialmente); `false` caso contrário.

**As duas ações dentro do `if`:**
- `setIsVisible(true)` → atualiza o estado, disparando a re-renderização do componente com o novo valor.
- `observer.disconnect()` → interrompe a vigilância. Como só é necessário saber que o elemento apareceu **uma vez** (a animação de entrada já terá acontecido), não faz sentido continuar consumindo processamento vigiando algo que já cumpriu seu papel.

---

## Conectando o observer ao elemento real, e a limpeza

```tsx
if (ref.current) {
  observer.observe(ref.current);
}

return () => observer.disconnect();
```

**`ref.current`:** é como se acessa o conteúdo da "caixinha" criada pelo `useRef`. Dentro do `useEffect` (que só roda depois da montagem), `ref.current` já deveria estar preenchido com o elemento real.

**Por que ainda existe o `if`, se já deveria estar preenchido:** é uma checagem de segurança. O TypeScript, observando o tipo de `ref.current` (`HTMLElement | null`), sabe que tecnicamente ele ainda poderia ser `null` em algum cenário raro (por exemplo, se o componente fosse removido da tela rapidamente, antes do efeito rodar). O `if` garante que `observer.observe(...)` só é chamado quando existe, de fato, um elemento real para passar.

**`observer.observe(ref.current)`:** a linha que "liga" tudo — diz ao observer "a partir de agora, vigia este elemento específico (o elemento real guardado no `ref`), e avisa quando ele entrar na tela".

**`return () => observer.disconnect();` — a função de limpeza (cleanup):** o React chama essa função automaticamente se o componente for removido da página antes do trabalho do observer terminar (por exemplo, ao navegar rapidamente para outra rota, em um site com múltiplas páginas).

**Por que isso importa mesmo num portfólio de página única:** sem essa limpeza, se o componente fosse removido e recriado (o que pode acontecer em certas situações do React, mesmo numa única página), o observer antigo continuaria "vigiando" um elemento que já não existe mais — um desperdício de processamento chamado **vazamento de memória** (memory leak). A função de limpeza garante que, sempre que o componente "for embora", o observer associado a ele também é desligado.

**Relação entre os dois `disconnect()`:** é a mesma função (`observer.disconnect()`), chamada em dois momentos diferentes — uma vez quando o elemento já apareceu (não é mais necessário vigiar), e outra como segurança, caso o componente seja removido antes disso acontecer.

---

## Por que o hook retorna um objeto, e não um array

```tsx
return { ref, isVisible };
```

Quem for usar este hook precisa de **duas coisas com papéis bem diferentes**: o `ref` (para conectar ao elemento que se quer observar) e o `isVisible` (para saber se o elemento já apareceu, e decidir o estilo). Isso é diferente do `useState`, que retorna um **array** posicional (`[valor, função de atualizar]`) — aqui, como as duas partes não seguem essa relação "valor + atualizador", um objeto com nomes (`ref`, `isVisible`) é mais claro para quem usa o hook depois.

---

## Resumo final

| Peça | Papel |
|---|---|
| `useRef<HTMLElement>(null)` | Cria a referência ao elemento HTML real (a `<section>`), inicialmente vazia |
| `useState(false)` | Guarda se o elemento já apareceu na tela ou não |
| `useEffect(..., [])` | Garante que o observer só é criado uma vez, depois do componente estar desenhado |
| `new IntersectionObserver(callback)` | Cria o "vigia" que detecta quando o elemento entra na tela |
| `entry.isIntersecting` | Indica se o elemento está visível naquele momento |
| `observer.observe(ref.current)` | Liga o vigia ao elemento real |
| `observer.disconnect()` | Para de vigiar (dentro do `if`, ao aparecer; no `return`, como limpeza de segurança) |
| `return { ref, isVisible }` | Entrega as duas informações que quem usa o hook precisa |


scroll reveal animation
scroll-driven animations, sticky positioning ou scroll-triggered animations.