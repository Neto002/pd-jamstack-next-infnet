import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();

    const apiKey = process.env.FIREBASE_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key não configurada." }),
        { status: 500 }
      );
    }

    const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    const response = await fetch(authUrl, {
      method: "POST",
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok)
      return NextResponse.json(
        { error: data.error?.message || "Erro de Cadastro" },
        { status: 401 }
      );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
};
