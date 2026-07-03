"use client"

import React from "react"

interface SidebarItemsProps {
    Icon?: React.ReactNode;
    pathname: string;
    href: string;
    title: string;
    click?: () => void;
}

export function SideBarItems({Icon, href, pathname, title, click}:SidebarItemsProps) {
    const selected = pathname === href
    return (
        <>
            <div className={`flex gap-2 ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer w-full  p-2 pl-8`} onClick={click}>
                <div className="">{Icon}</div>
                <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>{title}</div>
            </div>
        </>
    ) 
}