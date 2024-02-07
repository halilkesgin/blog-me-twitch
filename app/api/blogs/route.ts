import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(
    req: Request
) {
    try {
        const body = await req.json()
        const { title, content, isPublished } = body

        if (!title) {
            return new Response("Title is required", { status: 401 })
        }

        if (!content) {
            return new NextResponse("Content is required", { status: 401 })
        }

        const blog = await db.blog.create({
            data: {
                title,
                content,
                isPublished
            }
        })

        return NextResponse.json(blog)
    } catch {
        return new NextResponse("Server error", { status: 500 })
    }
}

export async function GET(
    req: Request
) {
    try {

        const { searchParams } = new URL(req.url)
        const blogId = searchParams.get("blogId") || undefined

        const blogs = await db.blog.findMany({
            where: {
                id: blogId
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(blogs)
    } catch {
        return new NextResponse("Server error", { status: 500 })
    }
}