"use server";

export const login = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  // Simulate authentication logic
  if (email === "" || password === "") {
    throw new Error("Email e senha são obrigatórios.");
  }

  // Here you would typically check the credentials against a database
  if (email === "antonio@neto.com" && password === "senha123") {
    return {
      success: true,
      message: "Login bem-sucedido!",
      email,
      password: "",
    };
  } else {
    throw new Error("Credenciais inválidas.");
  }
};
