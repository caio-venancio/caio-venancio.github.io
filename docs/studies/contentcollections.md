# Content Collections

## O que é o Content Collections?

## O que faz a função defineCollection de @content-collections/core?
De acordo com `https://docs.astro.build/en/guides/content-collections/`, defineCollection() configura um `loader` para carregar os dados, e é obrigatório e um `schema`, que muito recomendado. Ele é usado no content-collection.ts, na raíz do projeto.
De acordo com `https://www.content-collections.dev/docs/configuration`, os atributos `name`, `directory`, `include`, `include` e `schema` são obrigatórios.

## O que faz a função defineConfig de @content-collections/core?
De acordo com `https://www.content-collections.dev/docs/configuration`, The configuration file is a module that has to export a configuration object as the default export. The configuration object can be created with the defineConfig function from @content-collections/core and receives an object with a property called collections which contains an array of collection objects.

## O que é Zod?
Zod é uma biblioteca de schemas padrões compatíveis, que valida os documentos antes deles serem adicionados para a coleção.

## Qual é a utilidade de definir duas coleções em vez de só uma?