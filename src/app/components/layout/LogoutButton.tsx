"use client";

import { useRouter } from "next/navigation";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    // Disparar evento de mudança de autenticação
    window.dispatchEvent(new Event("auth-changed"));

    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-600 hover:text-red-800 font-medium px-4 py-2 border border-red-200 rounded hover:bg-red-500"
    >
      Sair
    </button>
  );
};

export default LogoutButton;
