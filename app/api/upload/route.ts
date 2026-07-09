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

    const filename = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

    // ─── Check if BLOB token exists → use Vercel Blob ─────────────────────────
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(`profiles/${filename}`, file, {
          access: "public",
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        return NextResponse.json({ url: blob.url });
      } catch (blobError) {
        // Log the real error so it appears in Vercel Function logs
        console.error("Vercel Blob upload error:", blobError);
        return NextResponse.json(
          { error: `Blob upload failed: ${blobError instanceof Error ? blobError.message : String(blobError)}` },
          { status: 500 }
        );
      }
    }

    // ─── No token → local dev: save to public/uploads ─────────────────────────
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);
    return NextResponse.json({ url: `/uploads/${filename}` });

  } catch (error) {
    console.error("Upload route error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}