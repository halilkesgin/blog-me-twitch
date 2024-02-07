import Link from "next/link"
import { BlogListCard } from "./_components/blog-list-card"
import { buttonVariants } from "@/components/ui/button"
import { db } from "@/lib/db"

const BlogsPage = async () => {

    const blogs = await db.blog.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className="p-10 flex flex-col flex-wrap gap-4">
            <Link
                href="/dashboard/blogs/add-new-blog"
                className={buttonVariants({ variant: "outline" })} 
            >
                Add new blog
            </Link>
            {blogs.map((blog) => (
                <BlogListCard 
                    key={blog.id}
                    data={blog}                
                />
            ))}

        </div>
    )
}

export default BlogsPage