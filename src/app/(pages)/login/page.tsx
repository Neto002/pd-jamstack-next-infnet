"use client";

import { login } from "@/app/services/user";
import Link from "next/link";
import { useFormState } from "react-dom";

const LoginPage = () => {
  const [state, formAction] = useFormState(login, {});
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Entrar na Conta
          </h1>

          <form className="space-y-6" action={formAction} method="post">
            <div>
              <label
                htmlFor="inline-email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                name="email"
                value={state.email}
                placeholder="seu@email.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                id="inline-email"
                type="email"
              />
            </div>

            <div>
              <label
                htmlFor="inline-password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Senha
              </label>
              <input
                name="password"
                value={state.password}
                placeholder="Sua senha"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                id="inline-password"
                type="password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white font-semibold py-2 rounded-md transition"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Não tem conta?{" "}
            <Link
              href="/registro"
              className="text-emerald-500 font-medium hover:underline"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
