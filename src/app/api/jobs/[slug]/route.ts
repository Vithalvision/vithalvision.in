import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/career-db";

export const dynamic = "force-dynamic";

function parseJsonArray(value: unknown): string[] {
  try {
    const parsed = JSON.parse(String(value ?? "[]"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const row = db
    .prepare("SELECT * FROM jobs WHERE slug = ? AND status = 'Open'")
    .get(slug) as Record<string, unknown> | undefined;

  if (!row) {
    return NextResponse.json(
      { success: false, message: "Job opening not found or no longer available." },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    job: {
      ...row,
      responsibilities: parseJsonArray(row.responsibilities),
      required_skills: parseJsonArray(row.required_skills),
      qualification: parseJsonArray(row.qualification),
    },
  });
}
