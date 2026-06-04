export type CompressOptions = {
  /** Longest edge in pixels after resize. Defaults to 1600. */
  maxDim?: number;
  /** JPEG quality 0–1. Defaults to 0.85. */
  quality?: number;
};

const DEFAULT_MAX_DIM = 1600;
const DEFAULT_QUALITY = 0.85;
const SKIP_BELOW_BYTES = 200 * 1024; // small images go through untouched

/**
 * Resize and re-encode an image as JPEG in the browser so it stays well under
 * Vercel's serverless body-size cap (~4.5 MB). Phone photos are typically
 * 3–10 MB straight off the camera; after this they're ~300–700 KB.
 *
 * Falls back to the original file if:
 *  - compression isn't possible (e.g. HEIC on a non-iOS browser, no canvas)
 *  - the result is somehow larger than the input
 *  - anything throws
 *
 * Safe to call with any File; non-images are returned as-is.
 */
export async function compressImage(file: File, opts: CompressOptions = {}): Promise<File> {
  if (typeof window === "undefined") return file;
  if (!file.type.startsWith("image/")) return file;
  if (file.size < SKIP_BELOW_BYTES) return file;

  const maxDim = opts.maxDim ?? DEFAULT_MAX_DIM;
  const quality = opts.quality ?? DEFAULT_QUALITY;

  try {
    const bitmap = await createImageBitmap(file);
    const { width, height } = scaleToFit(bitmap.width, bitmap.height, maxDim);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close?.();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality),
    );
    if (!blob || blob.size >= file.size) return file;

    const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], newName, { type: "image/jpeg", lastModified: Date.now() });
  } catch {
    return file;
  }
}

function scaleToFit(w: number, h: number, max: number) {
  if (w <= max && h <= max) return { width: w, height: h };
  const ratio = Math.min(max / w, max / h);
  return { width: Math.round(w * ratio), height: Math.round(h * ratio) };
}
