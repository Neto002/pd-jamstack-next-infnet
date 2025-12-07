import { Car } from "../interfaces/Car";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface CarMatter {
  content: string;
  data: Car;
}

const diretorio = path.join(process.cwd(), "public/carros");

const getSortedData = () => {
  // Ler somente o conteúdo direto da pasta `carros` (sem descer em subpastas)
  let nomesArquivos: string[] = [];
  try {
    nomesArquivos = fs.readdirSync(diretorio);
  } catch (err) {
    // Se a pasta não existir ou houver erro, retornar array vazio
    console.warn(`Erro ao ler diretório ${diretorio}:`, err);
    return [];
  }

  // Determinar arquivos .md válidos:
  // - se uma entrada é um arquivo .md no diretório raiz, use-a
  // - se uma entrada é uma subpasta, procure por um arquivo .md dentro (profundidade 1)
  const arquivosMd: string[] = [];

  for (const name of nomesArquivos) {
    const fullPath = path.join(diretorio, name);
    try {
      const stat = fs.lstatSync(fullPath);
      if (stat.isFile() && name.endsWith(".md")) {
        arquivosMd.push(name);
      } else if (stat.isDirectory()) {
        // procurar por um arquivo .md dentro da subpasta (ex.: index.md)
        try {
          const filhos = fs.readdirSync(fullPath);
          const mdChild = filhos.find((f) => f.endsWith(".md"));
          if (mdChild) {
            // armazenar caminho relativo (p.ex. 'honda-civic-2023/index.md')
            arquivosMd.push(path.join(name, mdChild));
          }
        } catch {
          // ignorar problemas de leitura da subpasta
        }
      }
    } catch {
      // ignorar entradas que não podem ser acessadas
    }
  }

  const dados: CarMatter[] = arquivosMd.map((fileName) => {
    // Se o arquivo está dentro de uma pasta, definimos o id como o nome da pasta
    let id = "";
    if (fileName.includes(path.sep)) {
      id = path.dirname(fileName);
    } else {
      id = fileName.replace(/\.md$/, "");
    }

    const fullPath = path.join(diretorio, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      content: matterResult.content,
      data: {
        title: matterResult.data.title || "",
        slug: matterResult.data.slug || id,
        date: matterResult.data.date || null,
        price: matterResult.data.price || 0,
        km: matterResult.data.km || 0,
        year: matterResult.data.year || 0,
        description: matterResult.data.description || "",
        hero_image: matterResult.data.hero_image || "",
        hero_image_alt: matterResult.data.hero_image_alt || "",
        hero_image_credit_text: matterResult.data.hero_image_credit_text || "",
        hero_image_credit_link: matterResult.data.hero_image_credit_link || "",
      },
    };
  });

  return dados.sort((a, b) => {
    // Ordena por data (mais recente primeiro) — se não houver data, mantém ordem
    const dateA = a.data?.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data?.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA;
  });
};

export const getCarrosMatter = (): CarMatter[] => {
  return getSortedData();
};

export const getCarros = (): Car[] => {
  const carrosMatter = getSortedData();
  return carrosMatter.map((car) => car.data);
};
