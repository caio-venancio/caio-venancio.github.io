import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  output: 'export'
};

export default withContentCollections(nextConfig);

// const repo = '/meu-jogo'; //nome do repositório

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',           // gera HTML/CSS/JS estático em /out
//   images: { unoptimized: true }, // evita otimização que exige servidor
//   // opcional: se usar rotas além de '/', pode querer URLs com /
//   // trailingSlash: true,
//   // basePath: repo,
//   // assetPrefix: repo + '/',
//   // trailingSlash: true, // ajuda no GitHub Pages a servir /rota/index.html
// };
// export default nextConfig;

