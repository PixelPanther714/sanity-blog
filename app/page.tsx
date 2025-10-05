import { client } from "@/lib/sanity"
import { postsQuery } from "@/lib/queries"
import PostCard from "@/components/post-card"

export default async function HomePage() {
  const posts = await client.fetch(postsQuery)

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No blog posts found. Add some posts in Sanity Studio!</p>
      )}
    </div>
  )
}
