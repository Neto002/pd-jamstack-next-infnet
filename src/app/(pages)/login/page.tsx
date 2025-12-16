"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Disparar evento de mudança de autenticação e navegar
        window.dispatchEvent(new Event("auth-changed"));
        // Use replace para não manter página de login no histórico
        router.replace("/");
        return;
      }

      // Se a resposta não for ok, tentar ler o JSON (pode lançar)
      const data = await response.json().catch(() => null);
      setError(data?.error || "Erro ao efetuar login.");
    } catch (err) {
      console.error("Erro no fetch /api/login:", err);
      setError("Erro de rede. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Entrar na Conta
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="seu@email.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="Sua senha"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white font-semibold py-2 rounded-md transition"
            >
              {loading ? "Entrando..." : "Entrar"}
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
