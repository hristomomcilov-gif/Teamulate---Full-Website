import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  MARKETING_SHARE_IMAGE,
  MARKETING_SHARE_IMAGE_URL,
  marketingShareMetadata,
} from "@/lib/site";

const SHARE_PNG = resolve(process.cwd(), "public/assets/og/teamulate-og.png");
const SOURCE_PNG = resolve(process.cwd(), "public/assets/og/teamulate-og-1536x1024.png");

function pngSize(buf: Buffer) {
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

describe("marketing share image", () => {
  it("points tags at the live 1200×630 URL", () => {
    expect(MARKETING_SHARE_IMAGE_URL).toBe("https://teamulate.ca/assets/og/teamulate-og.png");
    expect(MARKETING_SHARE_IMAGE.url).toBe(MARKETING_SHARE_IMAGE_URL);
    expect(MARKETING_SHARE_IMAGE.secureUrl).toBe(MARKETING_SHARE_IMAGE_URL);
    expect(MARKETING_SHARE_IMAGE.width).toBe(1200);
    expect(MARKETING_SHARE_IMAGE.height).toBe(630);
    expect(marketingShareMetadata.twitter.card).toBe("summary_large_image");
    expect(marketingShareMetadata.twitter.images).toEqual([MARKETING_SHARE_IMAGE_URL]);
  });

  it("keeps the exact downloaded PNG bytes and dimensions", () => {
    const share = readFileSync(SHARE_PNG);
    const source = readFileSync(SOURCE_PNG);
    expect(share.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe(true);
    expect(share.byteLength).toBe(594141);
    expect(pngSize(share)).toEqual({ width: 1200, height: 630 });
    expect(source.byteLength).toBe(1293583);
    expect(pngSize(source)).toEqual({ width: 1536, height: 1024 });
  });
});
