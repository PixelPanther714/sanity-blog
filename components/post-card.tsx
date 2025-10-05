import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SanityImage from "./sanity-image"

interface PostCardProps {
  post: {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    mainImage?: any
    publishedAt: string
  }
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Link href={`/blog/${post.slug.current}`}>
      <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-lg">
        {post.mainImage && (
          <SanityImage
            image={post.mainImage}
            alt={post.title}
            className="w-full h-48 object-cover"
            width={600}
            height={200}
          />
        )}
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{formattedDate}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
