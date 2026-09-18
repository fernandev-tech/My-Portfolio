# Guia de estudo — `key` no React: usar `id` ou `index`?

## O que é a `key`, relembrando

Sempre que um `.map()` gera uma lista de elementos JSX, o React precisa de uma forma de identificar **cada item individualmente**, para saber o que mudou entre uma renderização e outra (item adicionado, removido, reordenado). Essa identificação é a prop `key`.

## Opção 1 — `key` a partir de um `id` (ou outro valor único dos dados)

```tsx
{navItems.map((navItem) => (
  <li key={navItem.href}>{navItem.label}</li>
))}
```

Aqui, `navItem.href` (ou um campo `id` dedicado) já é um valor **único e estável** — vem dos próprios dados, não muda de posição.

**Quando usar:** sempre que os itens da lista tiverem um identificador próprio nos dados (um `id`, um `href` único, um slug) — que é o caso mais comum quando a lista vem de objetos (`{ id, label, href }`, `{ id, label, content }`, etc.).

## Opção 2 — `key` a partir do `index` (posição no array)

```tsx
{contentTab?.content.map((item, index) => (
  <li key={index}>{item}</li>
))}
```

`index` é o segundo parâmetro que o `.map()` sempre oferece, além do item em si — representa a posição do item no array (0, 1, 2...).

**Quando usar:** apenas quando os itens da lista **não têm** um identificador único natural (por exemplo, uma lista de `strings` simples, sem objeto/id associado) **e** a lista é **fixa** — não muda de ordem, não ganha nem perde itens dinamicamente durante o uso (não vem de uma ação do usuário tipo adicionar/remover/reordenar).

## Por que `index` não é ideal em listas que mudam

Se a lista puder ter itens **adicionados, removidos ou reordenados** (por exemplo, uma lista de tarefas onde o usuário pode apagar um item do meio), usar `index` como `key` causa um problema: quando um item é removido, todos os itens **depois** dele mudam de posição — e o React, usando `index` como key, pode confundir um item com outro, reaproveitando o estado interno errado, causando bugs visuais sutis (ex: um campo de input mantendo o valor errado depois de remover um item acima dele).

Com um `id` fixo nos dados, isso não acontece — o React sempre sabe exatamente "esse item é aquele mesmo, só mudou de posição", independentemente de reordenações.

## Resumo prático

| Situação | Usar |
|---|---|
| Lista de objetos com `id`/`href` próprio (ex: `navItems`, `workLinks`, `aboutTabs`) | `key` a partir desse campo único (`item.id`, `item.href`) |
| Lista de valores simples (`strings`, `numbers`), sem identificador próprio, e que **não muda** dinamicamente (dados fixos escritos no código) | `key={index}` é aceitável |
| Lista que o usuário pode reordenar, adicionar ou remover itens em tempo real | Sempre um `id` estável — nunca `index`, mesmo que os itens sejam simples |
