import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {

        const searchParams = req.nextUrl.searchParams
        const userId = searchParams.get("userid")
        if( !userId ) {
            return NextResponse.json({
                message: "user id not fount"
            }, {status: 404})
        }

        const onramp = await prisma.onRampTransaction.findMany({
            where: {userId: userId},
            omit: {token: true}
        })

        return NextResponse.json({
            onramp: onramp
        })

        
    } catch (err) {
        return NextResponse.json({
            message: "server error"
        }, {status: 200})
    }
}