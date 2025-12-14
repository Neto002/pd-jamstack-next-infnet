"use server";

interface AuthState {
  success: boolean;
  message: string;
  email?: string;
  password?: string;
  name?: string;
}

export const signup = async (
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (name === "" || email === "" || password === "") {
    throw new Error("Nome, email e senha são obrigatórios.");
  }

  console.log("Registro bem-sucedido!");
  return {
    success: true,
    message: "Registro bem-sucedido!",
    name,
    email,
    password,
  };
};
