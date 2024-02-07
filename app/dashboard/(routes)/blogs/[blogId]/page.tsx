import { db } from "@/lib/db"
import { BlogForm } from "./_components/blog-form"

interface BlogIdPageProps {
    params: { blogId: string }
}

const BlogIdPage = async ({
    params
}: BlogIdPageProps) => {

    const blog = await db.blog.findUnique({
        where: {
            id: params.blogId
        }
    })

    return (
        <div className="p-10">
            <BlogForm data={blog} />
        </div>  
    )
}

export default BlogIdPage