import { NextResponse } from "next/server";
import { TEMPLATE_REGISTRY } from "@/lib/latex/templates/registry";

export const dynamic = "force-dynamic";

export async function GET() {
  const list = Object.values(TEMPLATE_REGISTRY).map((t) => ({
    id: t.id,
    name: t.name,
    // thumbnail: `/templates/${t.id}.png` // optional: add in public/ later
  }));
  return NextResponse.json({ templates: list });
}
