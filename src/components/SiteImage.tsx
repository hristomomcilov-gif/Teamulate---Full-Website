import Image, { type ImageProps } from "next/image";
import { withBasePath } from "@/lib/base-path";

/** next/image does not prefix string srcs when `images.unoptimized` is on. */
export function SiteImage({ src, ...props }: ImageProps) {
  const resolved = typeof src === "string" ? withBasePath(src) : src;
  return <Image src={resolved} {...props} />;
}
