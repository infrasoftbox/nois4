# Processo de utilização do GIT nos projetos

Para padronização dos fluxos de projeto, foi sugerida a utilização do [Git Flow](https://github.com/nvie/gitflow) que já trás fluxos pré-definidos de trabalhado. 

## Instalação

Para instalação do plugin do git-flow seguir os [guias de instalação](https://github.com/nvie/gitflow/wiki/Installation) para cada distribuição. Em grande parte das distribuições linux o git-flow pode ser facilmente instalado a partir do gerenciador de pacotes. 

**Exemplo Mint:**

```
sudo apt-get install git-flow
```

## Inicialização

Para iniciar a utilização do git flow usar o comando 

```
git flow init -d
```
A opção -d irá setar todas as configurações padrão: 
- *master* : código de produção
- *develop* : código de desenvolvimento
- *feature/* : estrutura para as branches de funcionalidades
- *release/* : estrutura para as branches de versão
- *hotfix/* : estrutura para as branches de hotfix
- *tag/* : tags geradas  

## Cheatsheet

Existem dois bons links para as linhas de código e argumentos passados para utilização do git flow

* [Cheatsheet](https://github.com/nvie/gitflow/wiki/Command-Line-Arguments)
* [Cheatsheet versão em português](http://danielkummer.github.io/git-flow-cheatsheet/index.pt_BR.html)

## Estrutura básica

### Master

O código que está na *master* deve representar o código em produção do projeto. Em casos de projeto que ainda não está em produção a *master* deve conter a versão mais estável do projeto. A partir dessa branch que serão geradas as branches de *hotfix*.

### Develop

Código em desenvolvimento. Deve receber apenas os commits de funcionalidades que tem versões estáveis e estão aptas a subir em uma próxima versão. A partir dessa branch serão geradas as branches de *feature* e de *release*. 

### Feature

Código que representa uma funcionalidade. Fazendo a conexão com a metodologia de gerenciamento de projetos, seria equivalente a uma história.  
O código da *feature* será gerado a partir da branch de desenvolvimento e deve ser atualizado diariamente para evitar problemas de conflito na reintegração. 
Para iniciar uma feature usa-se o comando:

```
git flow feature start <name>
```

Após finalizar uma feature o fluxo irá fazer a reintegração da mesma com a branch de desenvolvimento, ou seja, irá fazer o merge da branch em si com a 
branch de desenvolvimento. Comando:

```
git flow feature finish <name>
```

Verificar as opções de parâmetros nos Cheatsheets. 

### Release

A branch de release representa uma versão que será gerada para envio para produção. Durante uma fase de homologação deve ser gerada uma release que representará o código "fechado" que subirá para produção. Essa versão deve ser testada, de preferência em ambiente similar ao de produção, unitariamente e funcionalmente. 

Para iniciar uma release: 

```
git flow release start <release>
```

Após o fechamento de uma release, o código será:
1. Reintegrado com a develop (pois podem ter sido feito correções de bugs na versão)
2. Realizado o merge com a master (envio do código para produção) 
3. Geração de uma TAG (a criação da tag pode ser desabilitada via parâmetro, porém é recomendada para que seja possível fazer transições entre versões facilmente no ambiente de produção por conta de algum eventual problema ou impacto) 

Comando: 

```
git flow release finish <release>
```

### Hotfix

As branches de hotfix são geradas para correções de bugs em produção. O processo de testes de cada branch deve ser feito no próprio código da branch e apenas após aprovação realizar o merge com a master. 
Comando para iniciar: 

```
git flow hotfix start <release>
```

O processo de finalização da hotfix já:
1. Realiza o merge com a master, colocando a versão em produção.
2. Realiza o merge com a develop, evitando que o código de desenvolvimento fique desatualizado. 

**Importante**: O finish da hotfix **não** faz o merge para as releases, portanto se existe uma release em processo de homologação, deve ser feito o merge manual para ela. 

Comando: 

```
git flow hotfix finish <release>
```

## Responsabilidades das equipes 

### Desenvolvimento 

- Criar as branches separadas por funcionalidade;
- Garantir que o que for enviado para *develop* esteja sempre concluído e íntegro, não afetando outras funcionalidades;
- Garantir que a branch que está utilizando está sempre atualizada com a branch de desenvolvimento para evitar conflitos e problemas com merge; 
- Realizar os merges necessários da parte de código que estiver desenvolvendo; 
- Criar os testes unitários e/ou funcionais para garantir, pelo menos, o fluxo principal de regras da parte desenvolvida; 

### Liderança Técnica 

- Melhorar a integração contínua;
- Garantir o bom funcionamento dos deploys, geração de versões, disponibilização de ambientes de homologação; 
- Remover obstáculos da equipe de desenvolvimento; 
- Realizar o code review sempre que possível do código gerado;
- Garantir que as métricas do projetos estão boas (issues, débito técnico, porcentagem de cobertura, execução dos testes, etc..) 

### Testes

- Realizar a validação, principalmente dos códigos que irão para produção (releases e hotfixes) 
- Garantir e cobrar a qualidade do que é entregue nas versões disponibilizadas;

### GCM

- Aprovar os merge-request e validar os merges gerados;
- Gerar as versões para cada ambiente e cenário; 
- Garantir o bom funcionamento do fluxo como um todo;