"use client"

import { AppBar } from "@repo/ui/AppBar";
import { signIn, signOut, useSession } from "next-auth/react";
import { SideBarItems } from "@repo/ui/components/SidebarItems";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home } from "lucide-react";


interface SideBarProps {
    children: React.ReactNode
}

export function Sidebar({children}: SideBarProps) {
    const session = useSession()
    const router = useRouter()
    const pathname = usePathname()

    return (
        <>
        <div className="min-h-screen">
            <AppBar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
            <div className="flex h-fit">
                <div className="w-[15%]  h-full flex flex-col items-center ">
                    <SideBarItems title="Home" href="/dashboard" pathname={pathname} click={() => router.push("/dashboard")}  />
                    <SideBarItems title="Transfer" href="/transfer" pathname={pathname} click={() => router.push("/transfer")}  />
                    <SideBarItems title="Transaction" href="/transaction" pathname={pathname} click={() => router.push("/transaction")}  />
                    <SideBarItems title="P2P Transfer" href="/p2ptransfer" pathname={pathname} click={() => router.push("/p2ptransfer")} />
                </div>
                <div className="children w-[85%] h-full">
                    {children}
                </div>
            </div>
        </div>
        
        </>
    )
}