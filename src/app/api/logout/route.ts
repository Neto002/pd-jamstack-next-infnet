import { removeSession } from "@/app/services/auth/session";
import { NextResponse } from "next/server";

export const POST = async () => {
  await removeSession();
  return NextResponse.json({ success: true });
};
