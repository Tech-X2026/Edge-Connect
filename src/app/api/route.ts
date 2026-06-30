import { NextResponse } from "next/server";

export const revalidate = false;

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}