import { createReadStream, statSync } from "node:fs";
import { Readable } from "node:stream";
import type { NextRequest } from "next/server";
import { getCapcutPath } from "@/lib/capcut-hero";

function toWebStream(nodeStream: import("node:fs").ReadStream) {
  return Readable.toWeb(nodeStream) as ReadableStream;
}

function contentType(filePath: string) {
  return filePath.toLowerCase().endsWith(".mov")
    ? "video/quicktime"
    : "video/mp4";
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slot: string }> }
) {
  const { slot } = await params;
  const n = Number(slot);
  if (!Number.isInteger(n) || n < 1 || n > 4) {
    return new Response("Invalid slot", { status: 400 });
  }

  const filePath = getCapcutPath(n);
  if (!filePath) {
    return new Response("Video not found", { status: 404 });
  }

  const { size } = statSync(filePath);
  const type = contentType(filePath);
  const range = req.headers.get("range");

  if (range) {
    const m = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (!m) {
      return new Response("Invalid range", { status: 416 });
    }
    const start = m[1] ? parseInt(m[1], 10) : 0;
    const end = m[2] ? parseInt(m[2], 10) : size - 1;
    if (start >= size || end >= size || start > end) {
      return new Response("Invalid range", { status: 416 });
    }
    const stream = toWebStream(createReadStream(filePath, { start, end }));
    return new Response(stream, {
      status: 206,
      headers: {
        "Content-Type": type,
        "Content-Length": String(end - start + 1),
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const stream = toWebStream(createReadStream(filePath));
  return new Response(stream, {
    headers: {
      "Content-Type": type,
      "Content-Length": String(size),
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
