# Scroll Reveal — Construção do Zero

## 1. Objetivo

Construir uma animação de **scroll reveal** para o portfólio:

* o elemento começa invisível e deslocado para baixo;
* conforme o usuário faz scroll, ele aparece gradualmente;
* simultaneamente, sobe até sua posição normal;
* quando chega ao final do percurso, fica totalmente visível;
* ao fazer scroll para cima, a animação é revertida;
* ao sair novamente da zona definida, o elemento pode voltar a desaparecer.

A implementação foi construída **sem biblioteca de animação**, usando:

* React
* TypeScript
* APIs do navegador
* `useRef`
* `useState`
* `useEffect`
* `getBoundingClientRect()`
* evento `scroll`
* Tailwind CSS para o estilo estrutural
* `style` inline para os valores dinâmicos da animação

---

# 2. A ideia principal

O navegador não nos entrega diretamente:

> "O elemento está 47% avançado na animação."

Ele nos fornece informações como:

```ts
rect.top
```

que representa a posição do topo do elemento em relação à viewport.

Então criamos uma transformação:

```text
posição do elemento
        ↓
matemática
        ↓
progress de 0 até 1
        ↓
propriedades visuais
        ↓
animação
```

O fluxo completo é:

```text
Usuário faz scroll
        ↓
evento "scroll"
        ↓
handleScroll()
        ↓
getBoundingClientRect()
        ↓
rect.top
        ↓
calcular progress
        ↓
limitar progress entre 0 e 1
        ↓
setProgress()
        ↓
React atualiza o estado
        ↓
opacity + translateY
        ↓
elemento se move/aparece
```

---

# 3. `useRef`: obtendo a referência do elemento

Começamos com:

```tsx
const ref = useRef<HTMLElement>(null);
```

O `ref` é uma espécie de "caixinha" que inicialmente está vazia.

Quando fazemos:

```tsx
<section ref={ref}>
```

o React associa essa referência ao elemento real do DOM.

Depois podemos acessar:

```tsx
ref.current
```

que representa o elemento HTML.

Por isso conseguimos fazer:

```tsx
ref.current.getBoundingClientRect()
```

---

# 4. `getBoundingClientRect()`

Usamos:

```tsx
const rect = ref.current.getBoundingClientRect();
```

`getBoundingClientRect()` é um método fornecido pelo navegador.

Ele informa a posição e as dimensões do elemento em relação à viewport.

Entre as propriedades retornadas temos:

```text
rect.top
rect.bottom
rect.left
rect.right
rect.width
rect.height
```

Para nossa animação, estamos interessados principalmente em:

```tsx
rect.top
```

## O que significa `rect.top`?

É a distância entre:

```text
topo da viewport
        ↓
topo do elemento
```

Exemplo:

```text
Viewport
┌──────────────────┐
│                  │
│                  │
│   elemento       │
│   ┌──────────┐   │
│   │          │   │
│   └──────────┘   │
└──────────────────┘
```

Se o topo do elemento estiver 500px abaixo do topo da viewport:

```ts
rect.top === 500
```

Quando fazemos scroll, o elemento muda de posição em relação à viewport.

Por isso, quando executamos novamente:

```tsx
getBoundingClientRect()
```

obtemos outro valor.

Importante:

> `getBoundingClientRect()` não detecta scroll e não anima nada. Ele apenas informa a posição do elemento no momento em que é chamado.

---

# 5. O evento `scroll`

Precisamos executar nossa lógica sempre que o usuário fizer scroll.

Para isso usamos:

```tsx
window.addEventListener("scroll", handleScroll);
```

E removemos o evento quando o efeito é desmontado:

```tsx
return () => {
  window.removeEventListener("scroll", handleScroll);
};
```

Isso é importante para evitar deixar listeners antigos ativos.

Nosso fluxo passa a ser:

```text
scroll
  ↓
handleScroll()
  ↓
getBoundingClientRect()
  ↓
novo rect.top
```

---

# 6. Por que criamos `progress`?

Os valores de `rect.top` não são convenientes para controlar uma animação.

Podemos ter:

```text
720
600
480
300
100
0
-100
-300
```

Queríamos transformar isso em algo previsível:

```text
0 ─────────────── 1
0%               100%
```

Criamos então:

```tsx
const [progress, setProgress] = useState(0);
```

O significado de `progress` é:

> Quanto do percurso da animação o elemento já percorreu?

Assim:

```text
progress = 0
→ animação ainda não começou

progress = 0.5
→ animação está aproximadamente na metade

progress = 1
→ animação chegou ao fim
```

---

# 7. A altura da viewport

Para que a animação funcione em telas de tamanhos diferentes, não usamos valores fixos como:

```text
800px
```

Em vez disso usamos:

```tsx
const viewportHeight = window.innerHeight;
```

`window.innerHeight` representa a altura da área visível da viewport.

Por exemplo:

```text
viewport = 800px
→ innerHeight = 800

viewport = 900px
→ innerHeight = 900

viewport = 1080px
→ innerHeight = 1080
```

Isso permite que nossa matemática seja proporcional à tela.

---

# 8. Definindo o início e o fim

Decidimos que o percurso da animação teria:

```tsx
const start = viewportHeight * 0.9;
const end = viewportHeight * 0.3;
```

Isso significa:

```text
start = 90% da altura da viewport
end   = 30% da altura da viewport
```

Se a viewport tiver 800px:

```text
start = 800 × 0.9
      = 720px

end = 800 × 0.3
    = 240px
```

Se tiver 1000px:

```text
start = 1000 × 0.9
      = 900px

end = 1000 × 0.3
    = 300px
```

Portanto, não dependemos de uma tela de 800px.

Estamos usando **proporções**.

---

# 9. A matemática do `progress`

Nossa fórmula foi:

```tsx
const rawProgress = (start - rect.top) / (start - end);
```

A ideia é descobrir:

> Quanto do caminho entre `start` e `end` o elemento já percorreu?

Supondo:

```text
start = 720
end = 240
```

## Quando o elemento está no início

```text
rect.top = 720
```

Então:

```text
(720 - 720) / (720 - 240)

0 / 480

= 0
```

Resultado:

```text
progress = 0
```

---

## Quando está no meio

```text
rect.top = 480
```

Então:

```text
(720 - 480) / (720 - 240)

240 / 480

= 0.5
```

Resultado:

```text
progress = 0.5
```

---

## Quando chega ao final

```text
rect.top = 240
```

Então:

```text
(720 - 240) / (720 - 240)

480 / 480

= 1
```

Resultado:

```text
progress = 1
```

Visualmente:

```text
720px ─────────────── 0
          ↓
600px ─────────────── 0.25
          ↓
480px ─────────────── 0.5
          ↓
360px ─────────────── 0.75
          ↓
240px ─────────────── 1
```

---

# 10. Por que `rawProgress` pode ultrapassar 0 e 1?

A fórmula não sabe que queremos limitar o resultado.

Se o elemento continuar descendo na viewport:

```text
rect.top > start
```

podemos obter:

```text
rawProgress < 0
```

Se o elemento continuar subindo:

```text
rect.top < end
```

podemos obter:

```text
rawProgress > 1
```

Por exemplo:

```text
rawProgress = -0.3
rawProgress = 0.5
rawProgress = 1.2
```

Matematicamente isso é perfeitamente válido.

Mas para a nossa animação queremos:

```text
0 ≤ progress ≤ 1
```

---

# 11. `clampedProgress`

Para limitar o resultado usamos:

```tsx
const clampedProgress = Math.min(
  Math.max(rawProgress, 0),
  1
);
```

A lógica é:

```text
valor menor que 0
→ transforma em 0

valor entre 0 e 1
→ mantém

valor maior que 1
→ transforma em 1
```

Exemplo:

```text
-0.5 → 0
 0   → 0
 0.25 → 0.25
 0.7 → 0.7
 1   → 1
 1.4 → 1
```

Assim temos um progresso seguro para controlar a animação.

---

# 12. Por que usamos `setProgress()`?

Depois de calcular:

```tsx
const clampedProgress = ...
```

temos um novo valor.

Então fazemos:

```tsx
setProgress(clampedProgress);
```

Isso informa ao React:

> Atualize o estado `progress` com o novo valor.

O fluxo passa a ser:

```text
scroll
 ↓
handleScroll()
 ↓
novo rect.top
 ↓
nova matemática
 ↓
novo clampedProgress
 ↓
setProgress()
 ↓
React atualiza progress
 ↓
componente renderiza novamente
```

Isso acontece novamente a cada mudança de posição provocada pelo scroll.

Por exemplo:

```text
scroll
→ progress = 0.20

scroll
→ progress = 0.31

scroll
→ progress = 0.45

scroll
→ progress = 0.63

scroll
→ progress = 0.81

scroll
→ progress = 1
```

E quando fazemos scroll para cima:

```text
1
↓
0.82
↓
0.64
↓
0.41
↓
0.20
↓
0
```

Por isso a animação é reversível.

---

# 13. Transformando `progress` em `opacity`

Queríamos que:

```text
progress = 0
→ invisível

progress = 0.5
→ parcialmente visível

progress = 1
→ totalmente visível
```

A relação é direta:

```tsx
const opacity = progress;
```

Portanto:

```text
progress    opacity

0           0
0.25        0.25
0.5         0.5
0.75        0.75
1           1
```

---

# 14. Transformando `progress` em movimento

Também queríamos que o elemento começasse abaixo e subisse até sua posição normal.

Escolhemos inicialmente:

```text
80px
```

como distância inicial.

Queríamos:

```text
progress = 0
→ translateY = 80px

progress = 1
→ translateY = 0px
```

Por isso usamos:

```tsx
const translateY = (1 - progress) * 80;
```

---

# 15. Por que `1 - progress`?

Se fizéssemos simplesmente:

```tsx
progress * 80
```

teríamos:

```text
progress = 0
→ 0px

progress = 1
→ 80px
```

Ou seja, o movimento seria:

```text
0 → 80
```

Mas nós queremos o contrário:

```text
80 → 0
```

Por isso usamos:

```tsx
1 - progress
```

Isso inverte a progressão:

```text
progress:

0 ───────────────→ 1

1 - progress:

1 ───────────────→ 0
```

Então:

```text
progress    translateY

0           80px
0.25        60px
0.5         40px
0.75        20px
1           0px
```

Assim o elemento começa 80px abaixo e vai subindo.

---

# 16. Ligando a animação ao elemento

Como `opacity` e `translateY` são valores dinâmicos, eles não são simplesmente classes fixas do Tailwind.

Usamos:

```tsx
style={{
  opacity,
  transform: `translateY(${translateY}px)`,
}}
```

Enquanto o Tailwind continua responsável pelo restante do estilo:

```tsx
className="max-w-6xl mx-auto px-6 py-20 space-y-4"
```

Portanto:

```text
Tailwind
→ layout, espaçamento, dimensões etc.

style dinâmico
→ valores que mudam conforme o scroll
```

Isso não significa abandonar Tailwind.

É uma combinação perfeitamente válida.

---

# 17. Código atual

Neste estágio, a lógica do hook está aproximadamente assim:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function useInView() {
  const ref = useRef<HTMLElement>(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();

      const viewportHeight = window.innerHeight;

      const start = viewportHeight * 0.9;
      const end = viewportHeight * 0.3;

      const rawProgress =
        (start - rect.top) / (start - end);

      const clampedProgress = Math.min(
        Math.max(rawProgress, 0),
        1
      );

      setProgress(clampedProgress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { ref, progress };
}
```

E no componente:

```tsx
const { ref, progress } = useInView();

const opacity = progress;
const translateY = (1 - progress) * 80;

return (
  <section
    ref={ref}
    id="sobre"
    className="max-w-6xl mx-auto px-6 py-20 space-y-4"
    style={{
      opacity,
      transform: `translateY(${translateY}px)`,
    }}
  >
    {/* conteúdo */}
  </section>
);
```

---

# 18. O que aprendemos de verdade

Esta implementação ensinou vários conceitos que podem ser reutilizados em outros projetos.

## React

Aprendemos:

* `useRef`
* `useState`
* `useEffect`
* atualização de estado
* referências para elementos DOM
* re-renderização provocada por mudança de estado
* cleanup de event listeners

## Browser APIs

Aprendemos:

* `window`
* `window.innerHeight`
* `window.addEventListener()`
* `window.removeEventListener()`
* evento `scroll`
* `getBoundingClientRect()`

## Matemática

Aprendemos:

* trabalhar com proporções;
* transformar uma faixa de valores em outra;
* normalizar um valor para `0 → 1`;
* limitar valores com `Math.min()` e `Math.max()`;
* inverter uma progressão usando `1 - progress`;
* usar uma variável de progresso para controlar propriedades visuais.

## CSS / Tailwind

Aprendemos:

* `opacity`;
* `transform`;
* `translateY()`;
* diferença entre estilos estáticos e valores dinâmicos;
* uso conjunto de Tailwind e `style`.

---

# 19. O conceito mais importante

O principal aprendizado não é a fórmula isolada.

É este padrão:

```text
ENTRADA
scroll do usuário
      ↓
MEDIÇÃO
posição do elemento
      ↓
TRANSFORMAÇÃO
posição → progress 0..1
      ↓
ESTADO
React guarda progress
      ↓
MAPEAMENTO
progress → propriedades visuais
      ↓
SAÍDA
elemento aparece e se movimenta
```

Esse padrão pode ser reutilizado para muitas outras animações.

Por exemplo:

```text
progress
   ↓
opacity
```

ou:

```text
progress
   ↓
translateY
```

ou:

```text
progress
   ↓
scale
```

ou:

```text
progress
   ↓
blur
```

ou até combinar várias propriedades.

---

# 20. O que ainda NÃO fizemos

Esta é a nossa versão funcional inicial.

Ainda não refinamos:

* easing;
* suavidade visual;
* distância ideal do movimento;
* zona ideal de entrada;
* combinação de `opacity` + `translateY` + `scale`;
* performance do evento `scroll`;
* reutilização do hook em várias seções;
* possíveis diferenças de comportamento entre elementos;
* acessibilidade para usuários que preferem reduzir movimento.

Esses serão os próximos níveis de refinamento.

Por enquanto, o mais importante foi provar que conseguimos construir o mecanismo fundamental **do zero e entendê-lo**.

---

# 21. Resumo rápido para revisão

Se no futuro eu esquecer tudo, posso lembrar deste mapa:

```text
1. Tenho uma referência para o elemento
        ↓
   useRef()

2. Detecto o scroll
        ↓
   window.addEventListener()

3. Descubro onde o elemento está
        ↓
   getBoundingClientRect()

4. Pego a posição vertical
        ↓
   rect.top

5. Defino onde começa e termina o percurso
        ↓
   start / end

6. Transformo a posição em progresso
        ↓
   rawProgress

7. Limito o progresso
        ↓
   clampedProgress

8. Atualizo o estado React
        ↓
   setProgress()

9. Transformo progress em propriedades visuais
        ↓
   opacity
   translateY

10. Aplico ao elemento
        ↓
   style
```

### Fórmulas principais

```text
start = viewportHeight × 0.9

end = viewportHeight × 0.3

rawProgress =
(start - rect.top) / (start - end)

clampedProgress =
Math.min(Math.max(rawProgress, 0), 1)

opacity =
progress

translateY =
(1 - progress) × 80
```

### Ideia central

> **Não estamos animando diretamente com o scroll. Estamos medindo o scroll, transformando essa medição em um progresso de 0 a 1 e usando esse progresso para controlar a aparência do elemento.**



Como encontrar extensões no vscode code --list-extensions
