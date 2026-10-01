### 3.6 Projetos — versão atualizada

> **Projetos**

- **2 projetos em destaque** no topo, apresentados como cards lado a lado e sempre visíveis.

- Cada card de projeto apresenta:
  - imagem;
  - badge sobre a imagem com o tipo de projeto (`Mobile`/`Web`) e a data;
  - nome do projeto;
  - descrição curta;
  - tags das tecnologias utilizadas;
  - botão **"Descrição"**;
  - botão **"Ver Projeto"**;
  - botão **"Ver Código"**.

- O **badge** ficará sobre a imagem do projeto e apresentará informações rápidas sobre o projeto:
  - tipo: `Web` ou `Mobile`;
  - ano/data do projeto.

- O botão **"Descrição"** abre o modal centralizado com as informações completas do projeto.

- O botão **"Ver Projeto"** direciona o visitante para a versão publicada do projeto, quando disponível.

- O botão **"Ver Código"** direciona o visitante para o respectivo repositório no GitHub.

- Os projetos em destaque utilizam a mesma estrutura visual e de interação dos demais projetos. A diferença está apenas na prioridade de exposição: os projetos marcados como `featured` aparecem imediatamente, enquanto os restantes ficam ocultos inicialmente.

- Abaixo dos projetos em destaque, haverá o botão **"Ver mais projetos"**, que expande um grid contendo os projetos restantes na mesma página.

- A **descrição curta** (`shortDescription`) permanece diretamente no card, permitindo que o visitante compreenda rapidamente o objetivo de cada projeto.

- A **descrição completa** (`description`) não será exibida diretamente no card. Ao clicar em **"Descrição"**, será aberto um **modal centralizado** com as informações detalhadas do projeto.

- O modal apresenta:
  - imagem do projeto;
  - nome;
  - descrição completa;
  - informações e funcionalidades estruturadas;
  - seção **"Como construí isto"**, apresentando o processo, decisões e raciocínio utilizados durante o desenvolvimento;
  - botão **"Ver Código"**;
  - botão **"Ver Projeto"**;
  - botão `X` para fechar.

- O modal terá **fundo escurecido**, ficará centralizado na tela e poderá ser fechado pelo `X` ou ao clicar fora dele, sem alterar a posição de scroll da página.

- A modelagem dos dados separa deliberadamente os diferentes níveis de informação:

```text
Project
├── shortDescription → resumo exibido no card
├── description      → conteúdo completo exibido no modal
├── howIBuilt        → processo de desenvolvimento exibido no modal
├── viewProject      → URL do projeto publicado
├── viewCode         → URL do repositório no GitHub
└── typeProject      → tipo do projeto exibido no badge