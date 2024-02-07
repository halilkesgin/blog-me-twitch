"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Blog } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

interface BlogFormProps {
    data: Blog | null
}

export const BlogForm = ({
    data
}: BlogFormProps) => {
    const router = useRouter()
    const { toast } = useToast()

    const [isLoading, setIsLoading] = useState(false)

    const formSchema = z.object({
        title: z.string().min(1, {
            message: "Title is required"
        }),
        content: z.string().min(1, {
            message: "Content is required"
        }),
        isPublished: z.boolean()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: data || {
            title: "",
            content: "",
            isPublished: true
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            await fetch("/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            toast({
                title: "Blog"
            })
            router.push("/dashboard/blogs")
        } catch {
            toast({
                title: "Something went wrong",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField 
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Title
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    {...field}
                                    disabled={isLoading}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Content
                            </FormLabel>
                            <FormControl>
                                <Textarea 
                                    {...field}
                                    disabled={isLoading}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                        <FormItem className="flex justify-between items-center gap-4">
                            <FormDescription>
                                Publish
                            </FormDescription>
                            <FormControl>
                                <Switch 
                                    disabled={isLoading}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    variant="outline"
                    type="submit"
                >
                    Add blog
                </Button>
            </form>
        </Form>
    )
}