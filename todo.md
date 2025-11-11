Static
- [] Adicionar licença 
    - [] Descobrir se tem como separar licença da pasta do jogo para código do site
- [] Fazer página inicial de Jogar
- [] Fazer página Home
    - [X] Colocar um carrosel de cards
        - [X] Fazer um esquema com as informações para cards no frontmatter.
            - [X] Encontrar algum exemplo de carrosel com cards
                // https://www.justinmind.com/ui-design/carousel
            - [X] Aplicar background de grama
                impressionante
            - [X] Aplica vidro fosco
                ficou bom não
        - [X] Colocar elementos coletados no card de forma elegante 
        - [X] Colocar 4 collection 
            - [X] Fazer template vazio 
            - [X] Fazer Agio 
            - [X] Fazer SuaPesquisaDeMatérias
            - [X] Fazer contador
            - [X] Fazer SeuPontoDigital
    - [] Consertar carrosel
    - [X] Decidir barra lateral
        por hora não vou por.
    - [X] Decidir fundo de section
        degradê azul no cinza ficou bom
    - [X] Colocar frases aleatórias debaixo do meu nome.
    - [] Fazer nova frase aleatória com F5 de algum jeito, agora está por build 
    - [X] Colocar links para contato
- [] Fazer página Sobre
- [] Fazer página Projetos
    - [] Fazer uma página por projeto
    - [] Colocar um carrosel de páginas de projeto
    - [] Colocar um contador de tecnologias
- [] Fazer Blog
    - [X] Ver se mini blog faz sentido
    - [] Colocar parser de blog <AQUI>
    - [] Colocar página sobre trace.moe <AQUI>
- [X] Fazer layout que se repete em todas as páginas (header, por exemplo)
- [X] Retirar barras laterais
- [X] Extrair o conteúdo .md para html

// https://www.justinmind.com/ui-design/carousel
// https://www.brunoribas.com.br/#toc1
// https://martinfowler.com/

Game
- [X] Fazer bloco que se mexe com setas ou wasd em fake zelda
- [] Conferir a estrutura dos jogos
    - [] colocar todas as funções que não seja as básicas da scene em outro lugar
        - [X] Colocar uma função fora para teste (não deu bom)
    - [] Ver algumas referências de component-based architecure ou de architeturas de peformance e modularidade
        - [] Entender o básico de arquitetura <AQUI>
        - [] Component-Based (CBA)
        - [] ECS (Entity–Component–System)
        - [] Layered (Camadas)
        - [] Ports & Adapters (Hexagonal)
        - [] Event-Driven (Pub/Sub)
- [X] Descobrir o que EventBus faz
- [X] Centralizar jogos
- [X] Fazer player se mover no celular
- [X] Fazer Player ser uma classe no Core
- [] Colocar descrição em arquivos confusos do jogo
- [X] Colocar background
- [X] Colocar collision
    - [X] Mark Certain tiles in the world layer as colliding (verificar se estão colidindo)
    - [X] Enable AP
    - [X] Set the player to collide with the worldLayer.
- [X] Colocar sprite animation no player
    - [X] Colocar layer acima do player
    - [X] Colocar assets/sprites/dude 
    - [X] Dar preload
    - [X] Colocar animações
    - [X] Colocar player no local de inicio (721, 300)
- [X] Colocar npc
- [] Consertar npc
    - [] Consertar física no npc
    - [] Colocar animação de caminhada
    - [] Colocar balão de conversar
- [] Colocar monstros
    - [X] Colocar balão de renascer/restart
        - [X] colocar hp
            - [X] Ver como printar na tela o hp com react
        - [X] para de se mexer quando hp chegar a 0
        - [X] colocar overlay quando hp chegar a 0
    - [] Colocar barra de vida no player
    - [X] Fazer entidade dar dano na collision 
    - [X] Fazer entidade perseguir 
    - [] Colocar knockback 
    - [] Fazer player atacar 
        - [] Pegar sprite da espada <AQUI>
        - [] fazer função de ataque com ângulo
        - [] fazer checagem de colisão
    - [] Fazer monstro morrer 
- [] Colocar ataque
- [] Colocar boss
- [] Fazer checklist de gamificação

Mobile
- [] Fazer layout do jogo
- [] Fazer gamepad
- [] Descobrir soluções de zoom para pixel
    - [] Assistir o problema de pixel
- [] Ver como fazer responsividade com react e com tailwind
    - [] Meta viewport
    - [X] Colocar pai com `flex-1 min-w-0` e filhos com `flex-wrap overflow-x-auto` no header
    - [X] Adaptar header com dropdown para celular <AQUI>

Testes
- [] Adicionar testes contra regressão
- [] Adicionar testes para build
- [] Separar interface do jogo para lógica

// cubefold-craft.com
