"use client"
import { SessionProvider } from "next-auth/react";
import React from "react";
import { RecoilRoot } from "recoil";

interface ProviderProp {
    children: React.ReactNode
}

export const Providers = ({children}: ProviderProp) => {
    return <RecoilRoot>
        <SessionProvider>
            {children}
        </SessionProvider>
    </RecoilRoot>
}