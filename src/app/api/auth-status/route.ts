import { verifySession } from "@/app/services/auth/session";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await verifySession();
  return NextResponse.json({ isLoggedIn: !!session });
};
