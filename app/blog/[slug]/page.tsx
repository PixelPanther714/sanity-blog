import type React from "react"
import { client } from "@/lib/sanity"
import { postBySlugQuery, postSlugsQuery } from "@/lib/queries"
import SanityImage from "@/components/sanity-image"
import { PortableText } from "@portabletext/react"

// Define the PortableText components for custom rendering
const components = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value.asset) return null
      return (
        <div className="my-8">
          <SanityImage
            image={value}
            alt={value.alt || "Blog post image"}
            className="w-full h-auto rounded-lg object-cover"
            width={800}
            height={450}
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2">{value.caption}</figcaption>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: { children: React.ReactNode }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }: { children: React.ReactNode }) => <h2 className="text-3xl font-bold my-3">{children}</h2>,
    h3: ({ children }: { children: React.ReactNode }) => <h3 className="text-2xl font-bold my-2">{children}</h3>,
    normal: ({ children }: { children: React.ReactNode }) => <p className="my-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 pl-4 italic text-muted-foreground my-4">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => <ul className="list-disc pl-5 my-4">{children}</ul>,
    number: ({ children }: { children: React.ReactNode }) => <ol className="list-decimal pl-5 my-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => <li className="mb-1">{children}</li>,
    number: ({ children }: { children: React.ReactNode }) => <li className="mb-1">{children}</li>,
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value: any }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined
      return (
        <a href={value.href} rel={rel} className="text-primary hover:underline">
          {children}
        </a>
      )
    },
    strong: ({ children }: { children: React.ReactNode }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: { children: React.ReactNode }) => <em className="italic">{children}</em>,
  },
}

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(postSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(postBySlugQuery, { slug: params.slug })

  if (!post) {
    return <div className="container mx-auto px-4 py-8 text-center">Post not found.</div>
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
      <article className="prose prose-gray dark:prose-invert mx-auto">
        <div className="space-y-2 not-prose mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">{post.title}</h1>
          <p className="text-muted-foreground">Published on {formattedDate}</p>
        </div>
        {post.mainImage && (
          <figure className="mb-8">
            <SanityImage
              image={post.mainImage}
              alt={post.title}
              className="w-full h-auto rounded-lg object-cover"
              width={800}
              height={450}
            />
          </figure>
        )}
        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} components={components} />
        </div>
      </article>
    </div>
  )
}
