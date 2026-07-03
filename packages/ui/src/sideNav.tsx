import React from "react"
import { SideBarItems } from "./components/SidebarItems"
import { Home } from "lucide-react"

interface SideNavProps {
    children: React.ReactNode
}

export function SideNav({children}: SideNavProps) {
    return (
        <>
        <div className="flex h-screen">
            <div className="w-[15%] bg-amber-500 h-full flex justify-center ">
                <SideBarItems Icon={<Home />} title="Home" href="/home" pathname="/home"  />
            </div>
            <div>
                {children}
            </div>
        </div>
        </>
    )
}
