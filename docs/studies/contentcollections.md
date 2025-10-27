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
De acordo com GPT:
Use múltiplas coleções quando cada tipo de conteúdo for conceitualmente distinto e exigir campos, validações ou rotas próprias.
Mantenha uma só se o conteúdo for homogêneo e as páginas puderem compartilhar o mesmo schema.

## O que allPosts do content-collections possui?
De acordo com `https://www.content-collections.dev/docs`:
The allPosts object is a collection, it contains an array of documents that you can use in your project. Each document has the shape defined in the collection configuration. You can access the properties of the document as you would with any other TypeScript object.

## O que acontece na hora de criar coleções quando o documento não encontra o formato esperado?

## Em qual momento coleções são criadas?
gpt: Durante o build (ou no npm run dev), ele cria tipos e funções de acesso automáticas.

## Com duas coleções, como eu acesso uma e como eu acesso outra?

## Como gerar rotas estáticas a partir de documentos do content collections?

## Como resgatar apenas um fragmento do content de um conteúdo?

