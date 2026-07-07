import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get("userid")
    if( !userId ) {
        return NextResponse.json({
            message: "user id not found"
        }, {status: 404})
    }

    try {

        const transfer = await prisma.p2PTransfer.findMany({
            where: {
                OR: [
                    {fromUserId: userId},
                    {toUserId: userId}
                ]
            },
            include: {
                fromUser: {select:{id: true, phone: true}},
                toUser: {select:{id: true, phone: true}}
            },
            orderBy: {
                timestamp: "desc"
            }
        })

        const p2p = transfer.map((t) => ({
            amount: t.amount,
            timeStamp: t.timestamp,
            otherNumber: t.fromUserId === userId 
                ? t.toUser.phone
                : t.fromUser.phone,
            status: t.fromUserId === userId ? "sent" : "recevied",
        }))
        
        return NextResponse.json({
            p2p
        }, {status: 200})



    } catch (err) {
        return NextResponse.json({
            message: "server error"
        }, {status: 500})
    }
}