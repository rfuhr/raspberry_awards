## Introdução

Projeto API RESTful para possibilitar a leitura da lista de indicados e vencedores
da categoria Pior Filme do Golden Raspberry Awards.

## Estrutura do Projeto

Projeto desenvolvido em nodejs, utilizando Typescript, com express e TypeORM, rodando com banco de dados SQLite em memória.
Estrutura de pastas separado por responsabilidades.

## Guia passo a passo

### Setup Inicial

1. Clonar o projeto https://github.com/rfuhr/test_outsera.git
2. Instale as dependências: `npm install`

#### Rodar projeto
1. Faça o build da aplicação: `npm run build`
2. Rode o projeto: `npm run start`

Ao iniciar a execução, será carregado os filmes que estão no arquivo Movielist.csv, que está na raiz do projeto.
Para iniciar com outra massa de teste, basta gravar o arquivo com este mesmo nome e extensão na raiz do projeto.

``Projeto vai rodar na porta 3000, caso necessário alterar, basta criar o arquivo .env na raiz do projeto com o conteúdo: PORT=3333"
##### Endpoint para buscar a lista de intervalo vencedores

`http://localhost:3000/api/producers/winning-intervals`

```
curl --request GET \
  --url http://localhost:3000/api/producers/winning-intervals \
  --header 'User-Agent: insomnia/2023.5.8'
```

#### Rodar testes de integração
1. Realize os passos do setup inicial, caso não tenha realizado ainda.
2. Execute os testes com comando: `npm run test`
