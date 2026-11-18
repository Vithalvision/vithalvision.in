import { NextResponse } from "next/server";
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

export async function GET() {
  const rows = db
    .prepare("SELECT * FROM jobs WHERE status = 'Open' ORDER BY created_at DESC")
    .all() as Record<string, unknown>[];

  const jobs = rows.map((row) => ({
    ...row,
    responsibilities: parseJsonArray(row.responsibilities),
    required_skills: parseJsonArray(row.required_skills),
    qualification: parseJsonArray(row.qualification),
  }));

  return NextResponse.json({ success: true, jobs });
}
