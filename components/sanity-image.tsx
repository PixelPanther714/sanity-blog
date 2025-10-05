import Image from "next/image"
import { useNextSanityImage } from "next-sanity-image"
import { client } from "@/lib/sanity"

interface SanityImageProps {
  image: any // Sanity image asset
  alt: string
  className?: string
  width?: number
  height?: number
}

export default function SanityImage({ image, alt, className, width, height }: SanityImageProps) {
  const imageProps = useNextSanityImage(client, image)

  if (!imageProps) {
    return null
  }

  return (
    <Image
      {...imageProps}
      alt={alt}
      className={className}
      sizes="(max-width: 800px) 100vw, 800px"
      width={width || imageProps.width}
      height={height || imageProps.height}
    />
  )
}
