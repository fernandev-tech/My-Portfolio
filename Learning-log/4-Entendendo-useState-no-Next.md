# Entendendo useState no Next

import { useState } from "react";

const [tabAtivo, setTabAtivo] = useState<string | null>(null);


useState(...) é uma função (mais uma, como Inter(...) foi lá no layout.tsx) — só que essa vem do próprio React, não do Next.js.

Ela retorna sempre dois valores: o valor atual do estado (tabAtivo), e uma função pra atualizar esse valor (setTabAtivo). Você nunca muda tabAtivo diretamente (tipo tabAtivo = "idiomas") — isso não funcionaria, precisa sempre passar pela função setTabAtivo("idiomas"), porque é essa chamada que avisa o React pra redesenhar a tela.

const [tabAtivo, setTabAtivo] = ... é destructuring de array (parecido com o destructuring de objeto que já vimos, mas com colchetes [] em vez de chaves {} — usado quando a ordem dos itens importa mais que o nome, que é exatamente o caso aqui: o primeiro item sempre é o valor, o segundo sempre é a função de atualizar).

useState<string | null>(null) — aqui entra TypeScript: o <string | null> diz "esse estado pode ser uma string, ou pode ser null". Por quê precisamos do null como possibilidade? Porque, lembra da regra que definimos — "clicar no tab ativo de novo, fecha"? Isso significa que, às vezes, nenhum tab está ativo — e null representa exatamente esse "nada selecionado". O | (chamado de union type, "tipo união") permite ao TypeScript aceitar mais de um tipo possível pra mesma variável.

(null) no final é o valor inicial do estado — quando a página carrega pela primeira vez, nenhum tab está aberto.

Tua missão agora, só essa parte (ainda não vamos pro JSX completo):

Cria a pasta AboutMe/ com AboutMe.tsx, importa useState do React, e declara esse estado (tabAtivo/setTabAtivo) dentro do componente. Não precisa fazer mais nada ainda — só essa declaração, pra garantir que o conceito ficou claro antes de avançarmos pra função que muda o valor no clique.


Quem sou? → O que faço? → Como trabalho? → De onde vim? → O que faço além de programar? → Para onde estou a ir?

