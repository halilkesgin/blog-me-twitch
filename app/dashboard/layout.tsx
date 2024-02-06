import { ReactNode } from "react"
import { Sidebar } from "./_components/sidebar"

interface DashboardLayoutProps {
    children: ReactNode
}

const DashboardLayout = ({
    children
}: DashboardLayoutProps) => {
    return (
        <div className="h-full">
            <div className="h-full md:flex md:w-64 flex-col md:fixed md:inset-y-0">
                <Sidebar />
            </div>
            <div className="md:pl-64">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout