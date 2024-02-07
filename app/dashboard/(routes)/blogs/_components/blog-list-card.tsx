import { Blog } from "@prisma/client"

interface BlogListCardProps {
    data: Blog | null
}

export const BlogListCard = ({
    data
}: BlogListCardProps) => {
    return (
        <div className="border w-[300px] h-[300px] p-4 rounded-lg">
            {data?.title}
        </div>
    )
}