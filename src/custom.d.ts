// custom.d.ts

// 1. Declaração para arquivos de imagem PNG, JPG, JPEG
// Isso informa ao TypeScript que importar esses arquivos retorna um módulo (geralmente a string do caminho da imagem).
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

// 2. Declaração para arquivos SVG
declare module '*.svg' {
  const content: string;
  export default content;
}

// 3. Tipagem para React (Caso haja erros remanescentes como 7026/2875)
/// <reference types="react" />
/// <reference types="react-dom" />