import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type BrandMarkProps = Omit<ImageProps, "src" | "width" | "height" | "alt"> & {
  alt?: string;
};

export default function BrandMark({
  alt = "",
  className,
  ...props
}: BrandMarkProps) {
  return (
    <Image
      src="/brand/selmou-logo-graphite.png"
      alt={alt}
      width={96}
      height={96}
      className={cn("block aspect-square object-contain", className)}
      draggable={false}
      {...props}
    />
  );
}
