[Público alvo](#1)

[Por que as convenções de nomenclatura são importantes](#2)
-	[Os nomes tem vida longa](#2)
-	[Nomes são contratos](#2)
-	[Mudança de contexto do desenvolvedor](#2)

[Convenções de nomenclatura](#3)

[Relações Singulares](#4)

[Campos-chave](#5)
- [Chaves primárias](#5)
- [Chaves estrangeiras](#5)

[Não usar prefixos e sufixos (são ruins)](#6)
- [Prefixos de tipo de relação](#6)
- [Prefixos de nomes de aplicativos](#6)
- [Sufixos de tipo de dados](#6)

[Auditoria de dados](#7)

[Nomeação explícita](#8)
- [índices](#8)
- [Restrições](#8)

[Pensamentos finais](#9)

> "Há apenas dois problemas difíceis em Ciência da Computação: invalidação de cache e nomeação de coisas."
- Phil Karlton

Neste post eu vou entrar no último. Especificamente, descreverei convenções de nomenclatura para objetos de banco de dados, por que eles são tão importantes e o que você deve e não deve fazer.

**Aviso!** Este é um post bastante opinativo e saúdo feedback de pessoas sugerindo alternativas.

---
#### Idioma

Este artigo foi traduzido e adaptado pra o idioma português do Brasil. Por isso as ordem dos adjetivos também foi alterada.

**Ex:** Usar ```"id_usuario"``` e não ```"usuario_id"```

**Ex:** Usar ```"numero_pedido"``` e não ```"pedido_numero"```

**Ex:** Usar ```"data_cadastro"``` e não ```"cadastro_data"```

---
<a name="1"></a> 
### Público alvo

A maioria das recomendações deve ser igualmente válida para outros bancos de dados relacionais, como o **MySQL**, **Oracle** ou **Microsoft SQL Server**.

Muitos deles também se aplicam a bases de dados **NoSQL**, embora não tudo. Por exemplo, a sugestão abaixo para usar as palavras completas vai contra a [abordagem recomendada](http://docs.mongodb.org/manual/faq/developers/#how-do-i-optimize-storage-use-for-small-documents) para nomear campos no **MongoDB**. Em caso de dúvida, encontre um guia para o tipo de banco de dados específico.

---
<a name="2"></a> 
### Por que as convenções de nomenclatura são importantes

#### Os nomes tem vida longa

As estruturas de dados devem durar muito mais do que o código do aplicativo. Qualquer pessoa que tenha trabalhado em um sistema de longa execução pode atestar isso.

Estruturas de dados bem definidas e layouts de tabelas vão sobreviver a qualquer código de aplicação. Não é incomum ver um aplicativo completamente reescrito sem quaisquer alterações feitas ao seu esquema de banco de dados.

#### Nomes são contratos

Objetos de banco de dados são referenciados por seus nomes, portanto, nomes de objeto são parte do contrato para um objeto. De uma maneira você pode considerar a tabela de banco de dados e nomes de colunas para ser a API para seu modelo de dados.

Uma vez que eles são definidos, alterá-los podem quebrar aplicativos dependentes. Esta é toda a razão mais para nomear as coisas corretamente antes do primeiro uso.

#### Mudança de contexto do desenvolvedor

Ter convenções de nomenclatura consistentes em seu modelo de dados significa que os desenvolvedores precisarão gastar menos tempo procurando nomes de tabelas, visualizações e colunas. Escrita e depuração de SQL é mais fácil quando você sabe que ```id_pessoa``` deve ser uma chave estrangeira para o ```id``` campo da tabela ```pessoa```.

---
<a name="3"></a> 
### Convenções de nomenclatura

##### Evite citações. 
Se você tiver que citar um identificador, então você deve renomeá-lo. Os identificadores citados são uma dor séria. Escrever SQL manualmente usando identificadores entre aspas é frustrante e escrever SQL dinâmico que envolve identificadores entre aspas é ainda mais frustrante.

Isso também significa que você nunca deve incluir espaços em branco em nomes de identificadores.

**Ex:** Evite usar nomes como ```"PrimeiroNome"``` ou ```"Todos Empregados"```.

##### Minúsculas
Os identificadores devem ser escritos inteiramente em minúsculas. Isso inclui tabelas, views, coluna e tudo o mais também. Nomes de identificadores de casos mistos significa que cada uso do identificador precisará ser citado entre aspas duplas (que já dissemos não são permitidos).

**Ex:** Use ```primeiro_nome``` , não ```"Primeiro Nome"``` .

##### Os tipos de dados não são nomes
Nomes de objeto de banco de dados, particularmente nomes de coluna, devem ser um substantivo descrevendo o campo ou objeto. Evite usar palavras que são apenas tipos de dados, tais como ```text``` ou ```timestamp``` . O último é particularmente ruim, pois fornece zero contexto.

**Palavras separadas por underscore**. Nome de objeto que são compostos de várias palavras devem ser separadas por sublinhados (ie. [snake_case](https://en.wikipedia.org/wiki/Snake_case)).

**Ex:** Use ```numero_palavras``` ou ```id_membro_time``` , não ```numeropalavras``` ou ```idMembroTime``` .

##### Não use preposições
Seguindo a regra de palavras compostas, não utilize preprosições.

**Ex:** Use ```nome``` ou ```nome_cliente```, não ```nome_do_cliente```.
**Ex:** Use ```data_cadastro```, não ```data_de_cadastro```.

##### Palavras cheias, e não abreviaturas
Os nomes dos objetos devem ser palavras completas. Em geral, evitar abreviações, especialmente se eles são apenas o tipo que remove vogais. A maioria dos bancos de dados SQL suporta pelo menos 30 caracteres nomes que devem ser mais do que suficiente para um par de palavras em inglês. PostgreSQL suporta até [63 caracteres](http://www.postgresql.org/docs/current/interactive/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS) para identificadores.

**Ex:** Use ```segundo_nome``` , não ```sgn_nom``` .

##### Usar abreviações comuns
 Por algumas palavras longas a sigla é tanto mais comum do que a própria palavra. ["Internacionalização" e "localização"](https://en.wikipedia.org/wiki/I18n) são os dois que vêm com mais frequência como ```i18n``` e ```l10n``` , respectivamente. Nestes casos, utilize a abreviatura.

Se você estiver em dúvida, use a palavra completa. Deve ser óbvio onde a abreviatura faz sentido.

##### Evite palavras reservadas
Evite usar qualquer palavra que é considerada uma palavra reservada no banco de dados que você está usando. Não há muitos deles, então não é muito esforço para escolher uma palavra diferente. Dependendo do contexto, as palavras reservadas podem exigir a citação. Isso significa que às vezes você vai escrever ```"user"``` e às vezes apenas ```user``` .

Outro benefício de evitar palavras reservadas é que o realce de sintaxe do editor menos-do que-inteligente não os destacará erroneamente.

**Ex:** Evite o uso de palavras como ```user``` , ```lock``` , ou ```table``` .

Aqui estão a lista de palavras reservadas para [PostgreSQL](http://www.postgresql.org/docs/9.3/static/sql-keywords-appendix.html) , [MySQL](http://dev.mysql.com/doc/refman/5.7/en/reserved-words.html) , a [Oracle](http://docs.oracle.com/cd/E16655_01/server.121/e17209/ap_keywd.htm#SQLRF022) e [MSSQL](http://technet.microsoft.com/en-us/library/ms189822.aspx).

---
<a name="4"></a> 
### Relações Singulares

**Tabelas, visualizações e outras relações que mantêm os dados devem ter nomes singulares, não plurais.** Isso significa que nossos tabelas e exibições seria nomeado ```time``` , não ```times```.

Ao invés de ir para a [álgebra relacional](https://en.wikipedia.org/wiki/Relational_algebra) explicação de por que isso é correto eu vou dar algumas razões práticas.

**Eles são consistentes.** É possível ter uma relação que contém uma única linha. É ainda plural?

**Eles são inequívocas.** Usando apenas nomes singulares significa que você não precisa para determinar como pluralizar substantivos.

**Ex:** Um objeto "Pessoa" entra em uma relação de "Pessoas" ou em um "Povo"? 

**Simples 4GL tradução.** Nomes singulares permitir que você traduzir diretamente do 4GL objetos às relações de banco de dados. Pode ser necessário remover alguns sublinhados e mudar para [camel case](https://en.wikipedia.org/wiki/Camel_case) mas a tradução nome será sempre para a frente.

**Ex:** ```membro_time``` sem ambiguidade se torna a classe ```MembroTime``` em Java ou a variável ```membro_time``` em Python.

---
<a name="5"></a> 
### Campos-chave

#### Chaves primárias

**Campos de chave primária de coluna única deve ser nomeado id**. É curto, simples e sem ambigüidade. Isso significa que quando você está escrevendo SQL você não precisa lembrar os nomes dos campos para participar.

```sql
CREATE TABLE pessoa (
  id            bigint PRIMARY KEY,
  nome_completo     text NOT NULL,
  data_nascimento    date NOT NULL
);
```
	 
Alguns guias sugerem prefixar o nome da tabela no nome do campo chave primária, ou seja. ```id_pessoa``` vs ```id``` . O prefixo extra é redundante. Todos os nomes de campos em instruções SQL não triviais (ou seja, aqueles com mais de uma tabela) deve ser explicitamente qualificado e prefixo como uma forma de namespacing nomes de campo é uma má idéia.

#### Chaves estrangeiras

**Campos de chave estrangeira deve ser uma combinação do nome da tabela de referência e o nome dos campos referenciados.** Para as chaves estrangeiras única coluna (de longe o caso mais comum) isso vai ser algo como id_foo .

```sql
CREATE TABLE membro_time (
  id_time       bigint NOT NULL REFERENCES time(id),
  id_pessoa     bigint NOT NULL REFERENCES pessoa(id),
  CONSTRAINT membro_time_pkey PRIMARY KEY (id_time, id_pessoa)
);
```

----
<a name="6"></a> 
### Prefixos e sufixos (são ruins)

#### Prefixos de tipo de relação

Algumas (mais velhos) diretrizes sugerem nomear tabelas com um prefixo ```TB_```, views com um prefixo ```VW_``` , ou procedures com um prefixo ```SP_``` . A razão é que um programador que ler algum SQL desconhecido reconheceria e saberia o tipo de objeto com base no nome. Mas esta é uma má idéia.

Os nomes de objetos não devem incluir o tipo de objeto neles. Dessa forma, você pode alterá-lo mais tarde. A visão de que é substituída por uma tabela mantém o contrato original de uma ideia (ex: você pode selecionar a partir dele). Um sistema dependente não precisa ser atualizado após essa alteração.

Eu vi muitos desses sistemas onde em algum ponto uma visão se tornará uma tabela. Em seguida, você vai acabar com o código de instruções INSERT em ```vw_foobar``` . Há ainda uma característica muito poderosa de PostgreSQL que permite que você defina [regras DML](http://www.postgresql.org/docs/9.3/static/rules-update.html) em vista (isto é. Você pode inserir / atualizar / excluir a partir deles).

Adicionar prefixos de tipo de objeto adiciona digitação extra e confusão extra na estrada.

### Prefixos de nomes de aplicativos

Outro (mais velho) sugestão é ter um prefixo comum para todos os seus objetos de banco de dados. Por exemplo, nosso app "Foobar" teria as tabelas ```Foobar_Usuarios``` , ```Foobar_Times``` , etc. Mais uma vez, esta é uma má idéia.

Todas as bases de dados modernas suportam alguma forma de namespacing. Por exemplo, em PostgreSQL você pode criar [esquemas](http://www.postgresql.org/docs/9.3/static/ddl-schemas.html) para objetos de banco de dados grupo. Se você tiver vários aplicativos compartilhando o mesmo banco de dados e quiser impedi-los de clobbering uns aos outros, use esquemas em vez disso. Isso é exatamente o que eles são para!

A maioria das pessoas não vai mesmo precisar deles embora. É muito mais comum que um banco de dados seja usado com um único modelo de dados lógicos do que vários modelos de dados separados. Portanto esquemas não serão necessários. Se você precisar deles, deve ser bastante óbvio.

A exceção a esta regra é se você estiver desenvolvendo uma base de dados agnóstica de banco de dados, como um framework ou um plugin. Suportar vários métodos de namespacing é complicado, então muitas estruturas dependem do prefixo de nome de aplicativo.

No entanto, a maioria das pessoas desenvolve aplicativos, não plugins ou frameworks, e seus aplicativos residirão sozinhos em um único tipo de banco de dados. Assim, não há razão para adicionar prefixos de nome de aplicativo a todos os objetos de banco de dados.

#### Sufixos de tipo de dados

Alguns guias (mais uma vez aqueles geralmente mais velhos), sugerem sufixando seus nomes de coluna com o tipo de dados do campo. Por exemplo, um campo de texto para um nome seria ```name_tx``` . Haverá mesmo extensas listas para traduzir de tipos de dados para sufixos, texto -> tx, data -> dt, etc

**Esta é uma má idéia!**

Tipos de dados de campo podem ser alterados. Um campo de data pode se tornar um timestamp, um int pode se tornar um bigint ou numérico.


---
<a name="7"></a> 
### Auditoria de dados

#### Data de insert e update de registros

Todas tabelas deve possuir os campos **date_insert** com valor default **now()** e o campo **date_update** com uma trigger de **date_update_now()**. *(Em alguns frameworks esses nomes  podem ser diferentes).* 
Usar o valor default e a trigger para evitar que alguma parte do sistema ou outro sistema use a tabela e esses dados sejam desatualizados.

```sql
CREATE TABLE pessoa {
	id: int autoincrement
	date_insert: now()
	date_update: trigger(now())
}

-- Function Trigger Date Update
CREATE OR REPLACE FUNCTION date_update()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_update = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger
CREATE TRIGGER trigger_data_update BEFORE UPDATE ON pessoa FOR EACH ROW EXECUTE PROCEDURE date_update();

```

---
<a name="8"></a> 
### Nomeação explícita

Alguns comandos de banco de dados que criam objetos de banco de dados não exigem que você especifique um nome. Um nome de objeto será gerado aleatoriamente (ex: fk239nxvknvsdvi) ou através de uma fórmula (ex: foobar_ix_1). A menos que você saiba exatamente como um nome será gerado e você está feliz com ele, você deve especificar explicitamente os nomes.

Isto também inclui nomes gerados por [ORMs](https://en.wikipedia.org/wiki/Object-relational_mapping) . Muitos ORMs padrão para a criação de índices e restrições com longas gibberish nomes gerados. Os dois minutos de economia de tempo no curto prazo não vale a pena a dor de cabeça em recordar o ```fkas9dfnksdfnks``` refere-se a longo prazo.

#### Índices

Os índices devem ser explicitamente nomeados e incluir o nome da tabela eo nome da coluna indexados. Incluindo os nomes das colunas torná-lo muito mais fácil de ler através de SQL explicar planos. Se um índice é nomeado ```foobar_ix1``` então você precisa olhar para cima que colunas que o índice de cobre para entender se ele está sendo usado corretamente.

```sql
CREATE TABLE pessoa (
  id          bigserial PRIMARY KEY,
  email       text NOT NULL,
  primeiro_nome  text NOT NULL,
  sobrenome   text NOT NULL,
  CONSTRAINT pessoa_ck_email_lower_case CHECK (email = LOWER(email))
);

CREATE INDEX pessoa_idx_primeiro_nome_sobrenome ON pessoa (primeiro_nome, sobrenome);
 ```
 
Explicar planos agora será fácil de entender. Podemos ver claramente que o índice em primeiro e último nome, ou seja. ```pessoa_idx_primeiro_nome_sobrenome``` , está sendo usado:

```sql
=# EXPLAIN SELECT * FROM pessoa WHERE primeiro_nome = 'alice' AND sobrenome = 'smith';

                                          QUERY PLAN                                          
----------------------------------------------------------------------------------------------
 Index Scan using pessoa_idx_primeiro_nome_sobrenome on pessoa  (cost=0.15..8.17 rows=1 width=72)
   Index Cond: ((primeiro_nome = 'alice'::text) AND (sobrenome = 'smith'::text))
(2 rows)
  ```
	
### Restrições

Semelhante aos índices, restrições devem dar nomes descritivos. Isto é especialmente verdadeiro para restrições de verificação. É muito mais fácil diagnosticar uma inserção errada se a restrição de verificação que foi violada permite que você saiba a causa.

```sql
CREATE TABLE time (
  id          bigserial PRIMARY KEY,
  nome        text NOT NULL
);

CREATE TABLE membro_time (
  id_time     bigint REFERENCES time(id),
  id_pessoa   bigint REFERENCES pessoa(id),
  CONSTRAINT membro_time_pkey PRIMARY KEY (id_time, id_pessoa)
);
```

Observe como o PostgreSQL faz um bom trabalho ao fornecer nomes descritivos às restrições de chave estrangeira.

```bash
=# \d membro_time
   Table "public.membro_time"
  Column   |  Type  | Modifiers 
-----------+--------+-----------
 id_time   | bigint | not null
 id_pessoa | bigint | not null
Indexes:
    "membro_time_pkey" PRIMARY KEY, btree (id_time, id_pessoa)
Foreign-key constraints:
    "membro_time_id_pessoa_fkey" FOREIGN KEY (id_pessoa) REFERENCES pessoa(id)
    "membro_time_id_time_fkey" FOREIGN KEY (id_time) REFERENCES time(id)
```

Se tentarmos inserir uma linha que viola uma dessas restrições, imediatamente saberemos a causa apenas com base no nome da restrição:

```bash
=> INSERT INTO membro_time(id_time, id_pessoa) VALUES (1234, 5678);
ERROR:  insert or update on table "membro_time" violates foreign key constraint "membro_time_id_time_fkey"
DETAIL:  Key (id_time)=(1234) is not present in table "time".
```

Da mesma forma, se tentarmos inserir um endereço de e-mail que não seja minúsculo na tabela ```pessoa``` criada acima, vamos obter um erro de violação de restrição que nos diz exatamente o que está errado:

```bash
-- This insert will work:
=> INSERT INTO pessoa (email, primeiro_nome, sobrenome) VALUES ('alice@example.com', 'Alice', 'Anderson');
INSERT 0 1

-- This insert will not work:
=> INSERT INTO pessoa (email, primeiro_nome, sobrenome)  VALUES ('bob@EXAMPLE.com', 'Bob', 'Barker');
ERROR:  new row for relation "pessoa" violates check constraint "pessoa_ck_email_lower_case"
DETAIL:  Failing row contains (2, bob@EXAMPLE.com, Bob, Barker).
```

### Criação de índices

Como padrão todas primary keys tem índices gerados automaticamente, mas quando é feito relacionamento de tabelas via aplicação, esse índice não é criado. Então ele deve ser criado para ganho de performance.

```sql
CREATE TABLE status {
	id: int autoincrement
	nome: string
	...
}

CREATE TABLE pedido {
	id: int autoincrement
	data_pedido:
	id_status: int
	...
}
CREATE INDEX "pedido_idx_id_status" ON pedido USING btree (id_status);
```

Essa tabela deverá possuir um índice por id e outro índice por status, para auxiliar os filtros.

#### Índices compostos

Caso a tabela tenha mais de uma chave estrangeira, que é normalmente usada para joins e etc, então deve ser criado um índice composto.

Deve ser observado a precedência dos índices na criação. Sempre do índice com menor retorno de registros para o com maior retorno. [referência](http://dextra.com.br/pt/como-o-postgresql-usa-multiplos-indices-na-mesma-consulta/)

"id_status_pagamento = 1" retorna 10 registros
"id_status_entrega = 1" retorna 100 registros

**Tabela pedido com dois status: entrega e pagamento.**

```sql
CREATE TABLE pedido {
	id: int autoincrement
	id_status_pagamento: int
	id_status_entrega: int
	...
}
CREATE INDEX "pedido_idx_id_status_pagamento_id_status_entrega" ON pedido USING btree (id_status_pagamento,id_status_entrega);
```
---
<a name="9"></a> 
### Pensamentos finais

Se você está iniciando um novo projeto, sugiro que siga as convenções descritas aqui. Se você estiver trabalhando em um projeto existente, então você precisa ser um pouco mais cuidadoso com quaisquer novos objetos que você criar.

A única coisa pior do que convenções de nomenclatura ruim é múltiplas convenções de nomenclatura. Se seu projeto existente já tiver uma abordagem padrão para nomear seus objetos de banco de dados, então continue usando.

Autor: sehrope@jackdb.com