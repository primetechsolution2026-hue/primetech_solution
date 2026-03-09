import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Sanitize filename
    const filename = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

    // ─── VERCEL (live) → use Vercel Blob ──────────────────────────────────────
    if (process.env.VERCEL) {
      const blob = await put(`profiles/${filename}`, file, {
        access: "public",
      });
      return NextResponse.json({ url: blob.url });
    }

    // ─── LOCAL → save to public/uploads ───────────────────────────────────────
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Create uploads folder if it doesn't exist
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Return a URL that the browser can access
    const url = `/uploads/${filename}`;
    return NextResponse.json({ url });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}