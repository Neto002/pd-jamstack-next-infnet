"use server";

import matter from "gray-matter";
import { remark } from "remark";

export const login = async (prevState, formData) => {
  console.log("Form Data Recebido no Servidor:", formData);
  console.log("Estado Anterior:", prevState);
  const email = formData.get("email");
  const password = formData.get("password");

  if (email === "" || password === "") {
    throw new Error("Email e senha são obrigatórios.");
  }

  if (email === "antonio@neto.com" && password === "senha123") {
    console.log("Login bem-sucedido!");
    return {
      success: true,
      message: "Login bem-sucedido!",
      email,
      password,
    };
  } else {
    throw new Error("Credenciais inválidas.");
  }
};

export async function convertMarkdownToHtml(markdownContent: string) {
  const matterResult = matter(markdownContent);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    contentHtml,
  };
}
