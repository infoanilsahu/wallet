"use server"

import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export async function createOnRampTxn(amount: number, provider: string) {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id
    const token = crypto.randomUUID()

    if( !userId ) {
        return {
            message: "you are not logged in"
        }
    }

    if( amount <= 0 ) {
        return {
            message: "invalid amount"
        }
    }

    await prisma.onRampTransaction.create({
        data: {
            token,
            amount,
            startTime: new Date(),
            provider,
            userId,
            status: "Processing"
        }
    })
}
