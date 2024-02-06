"use client"

import Link from "next/link"
import { Book, Home } from "lucide-react"
import { usePathname } from "next/navigation"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const routes = [
    {
        label: "Dashboard",
        icon: Home,
        href: "/dashboard"
    },
    {
        label: "Blogs",
        icon: Book,
        href: "/blogs"
    }
]

export const Sidebar = () => {

    const pathname = usePathname()

    return (
        <div className="py-4 flex flex-col justify-between h-full border-r">
            <div className="overflow-y-auto scroll-smooth px-3 flex flex-col gap-4">
                <div className="flex flex-col">
                    <h1 className="text-2xl">
                        blog-me
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        best bloggers
                    </p>
                </div>
                <div className="space-y-2 flex flex-col">
                    {routes.map((route) => (
                        <Button 
                            variant="ghost"
                            asChild
                            className={cn(
                                pathname === route.href && "bg-accent"
                            )}
                        >
                            <Link
                                key={route.href}
                                href={route.href}
                                >
                                {route.label}
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}