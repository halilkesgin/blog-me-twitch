import { ReactNode } from "react"
import { Navbar } from "./_components/navbar"

interface LandingLayoutProps {
    children: ReactNode
}

const LandingLayout = ({
    children
}: LandingLayoutProps) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

export default LandingLayout