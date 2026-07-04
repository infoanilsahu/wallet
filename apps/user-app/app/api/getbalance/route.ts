import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const userId = searchParams.get("userid")

        if( !userId ) {
            return NextResponse.json({
                message: "user id not fount"
            }, {status: 404})
        }
        
        const balance = await prisma.balance.findFirst({
            where: {userId: userId}
        })

        return NextResponse.json({
            lockBalance: balance?.locked,
            amount: balance?.amount,
        }, {status: 200})
        
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            message: "server error"
        }, {status: 500})
    }
}