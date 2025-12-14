"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatBrazilPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

const ContatoPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof typeof formData, boolean>>
  >({});

  const router = useRouter();

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "nome":
        if (!value.trim()) return "Nome é obrigatório";
        return "";
      case "email":
        if (!value.trim()) return "Email é obrigatório";
        if (!emailRegex.test(value)) return "Email inválido";
        return "";
      case "telefone": {
        const digits = value.replace(/\D/g, "");
        if (!digits) return "Telefone é obrigatório";
        if (digits.length !== 11)
          return "Telefone deve ter 11 dígitos (ex: (11) 91111-1111)";
        return "";
      }
      case "mensagem":
        if (!value.trim()) return "Mensagem é obrigatória";
        if (value.trim().length < 10)
          return "Mensagem muito curta (mínimo 10 caracteres)";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    let value = e.target.value;

    if (name === "telefone") {
      value = formatBrazilPhone(value);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // validar em tempo real
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const validateAll = () => {
    const newErrors: Partial<typeof formData> = {};
    (Object.keys(formData) as (keyof typeof formData)[]).forEach((key) => {
      const val = formData[key] as string;
      const err = validateField(key, val);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    // mark all as touched
    const allTouched: Partial<Record<keyof typeof formData, boolean>> = {};
    (Object.keys(formData) as (keyof typeof formData)[]).forEach(
      (k) => (allTouched[k] = true)
    );
    setTouched(allTouched);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    alert(
      `Mensagem enviada!\n\nNome: ${formData.nome}\nEmail: ${formData.email}\nTelefone: ${formData.telefone}\nMensagem: ${formData.mensagem}`
    );
    router.push("/");
  };

  const inputClass = (field: keyof typeof formData) =>
    `block w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 border ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="flex-1 justify-center items-center w-[30%] px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Entre em Contato
        </h1>

        <form
          className="bg-white shadow-sm rounded-lg p-6 space-y-6"
          onSubmit={handleSubmit}
          noValidate
        >
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("nome")}
              aria-invalid={!!errors.nome}
              aria-describedby={errors.nome ? "error-nome" : undefined}
              placeholder="Digite seu nome"
            />
            {touched.nome && errors.nome && (
              <p id="error-nome" className="text-red-600 text-sm mt-1">
                {errors.nome}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "error-email" : undefined}
              placeholder="seu@email.com"
            />
            {touched.email && errors.email && (
              <p id="error-email" className="text-red-600 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="telefone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Telefone
            </label>
            <input
              id="telefone"
              name="telefone"
              type="tel"
              value={formData.telefone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("telefone")}
              aria-invalid={!!errors.telefone}
              aria-describedby={errors.telefone ? "error-telefone" : undefined}
              placeholder="(11) 91111-1111"
            />
            {touched.telefone && errors.telefone && (
              <p id="error-telefone" className="text-red-600 text-sm mt-1">
                {errors.telefone}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="mensagem"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mensagem
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={6}
              value={formData.mensagem}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("mensagem")}
              aria-invalid={!!errors.mensagem}
              aria-describedby={errors.mensagem ? "error-mensagem" : undefined}
              placeholder="Digite sua mensagem"
            />
            {touched.mensagem && errors.mensagem && (
              <p id="error-mensagem" className="text-red-600 text-sm mt-1">
                {errors.mensagem}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded-md"
            >
              Enviar Mensagem
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ContatoPage;
