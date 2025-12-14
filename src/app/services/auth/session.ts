import "server-only";
import { cookies } from "next/headers";
import { admin } from "../auth/firebase-admin";

export const createSession = async (idToken: string) => {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  const sessionCookie = await admin
    .auth()
    .createSessionCookie(idToken, { expiresIn });

  const cookieStore = await cookies();
  cookieStore.set("session", sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
};

export const removeSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("session");
};

export const verifySession = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    return decodedClaims;
  } catch {
    return null;
  }
};
