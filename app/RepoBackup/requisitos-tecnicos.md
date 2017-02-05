## Requisitos técnicos novos projetos 2017

### 1.  Readme - Wiki

* O readme do projeto deve ser criado através do sistema de Wiki do Gitlab e deve contem as seguintes informações:
  * Descrição resumida do projeto e do cliente.
  * Documentação completa do projeto, como regras de negócio e etc. (Link para a pasta da rede)
  * DER Inicial do projeto. *Pois o DER atualizado pode ser extraído do banco atual via engenharia reversa.*
  * Requisitos de sistema para desenvolvimento. (Ferramentas e programas para o desenvolvimento) 
  * Manual de preparação do ambiente de desenvolvimento. (Ex: instalação e uso do docker, configuração da massa de dados, etc)
  * Padrões de codificação utilizadas no projeto. Ex: [PHP PSR](http://www.php-fig.org/psr/psr-2/), [JAVA](http://www.oracle.com/technetwork/java/javase/documentation/codeconventions-137946.html) ou [JAVA TOC](https://docs.oracle.com/javase/tutorial/java/TOC.html)
  * Padrões de nomeação de bando de dados. Ex: [SQL NAMING CONVENTIONS](sql-naming-conventions)
  * Definição e configuração do framework de testes funcionais. Ex: behat , selenium, etc.
  * Manual para execução de testes durante o desenvolvimento.

### 2. Jenkins

* Deploy configurado no Jenkins utilizando uma imagem específida de docker com todas suas dependências do projeto.
* Testes periódicos configurados no Jenkins.

### 3. Sonar

* Sonar configurado para medição de complexidade de código e adoção dos padrões de codificação. Ex: PSR2, Java TOC, Etc.

### 4. Gitlab

* O projeto deve estar configurado no Gitlab com duas devidas permissões e triggers de interação com o SONAR.
* O projeto deve seguir o padrão de gitflow. [Tutorial GitFlow](https://fjorgemota.com/git-flow-uma-forma-legal-de-organizar-repositorios-git/)

### 5. Documentação

* Toda a documentação deve esta na pasta do projeto e relacionada na wiki do projeto.
* A documentação deve contemplar também o DER, Mockup (UX/UI).

### 6. Ambiente de desenvolvimento

* Todos desenvolvedores do projeto devem utilizar as mesmas versões de servidor, banco de dados, interpretador e etc. 
* Para garantir essa padronização cada projeto deve possuir sua imagem de docker de desenvolvimento e todos dever utiliza-la.
* Todas IDEs utilizadas devem seguir os mesmos padrões de codificação (ex: UTF-8), identação (ex: usar 4 espaços no lugar de TAB), etc.

### 7. Banco de dados

* Todos projetos devem utilizar um sistema de versionamento para banco de dados.