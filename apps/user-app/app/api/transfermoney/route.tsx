import { TransMoney } from "@/validation/transferMoney";
import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        
        const paraser = TransMoney.safeParse(body)
        if( !paraser.success ) {
            return NextResponse.json({
                message: "invalid input",
            }, {status: 411})
        }

        const { amount, password, phone, userId } = paraser.data

        const user = await prisma.user.findFirst({
            where: {id: userId},
            select: {
                id: true,
                password: true,
                Balance: {select: {amount: true}}
            }
        })
        if( !user ) {
            return NextResponse.json({
                message: "user id not found"
            }, {status: 404})
        }

        const transferUser = await prisma.user.findUnique({
            where: {phone: phone}
        })
        if( !transferUser ) {
            return NextResponse.json({
                message: "phone number not exist"
            }, {status: 404})
        }

        const passCheck = await bcrypt.compare(password, user.password)
        if( !passCheck ) {
            return NextResponse.json({
                message: "wrong password"
            }, {status: 400})
        }

        if( user.Balance[0].amount < amount ) {
            return NextResponse.json({
                message: "not have enough balance",
            }, {status: 400})
        }        

        await prisma.$transaction(async (tx) => {
            await tx.balance.update({
                where: {userId: user.id},
                data: {
                    amount: {
                        decrement: amount
                    }
                }
            })

            await tx.balance.update({
                where: {userId: transferUser.id},
                data: {
                    amount: {
                        increment: amount
                    }
                }
            })
        })

        return NextResponse.json({
            message: "successfully transfer"
        }, {status: 200})


        
    } catch (err) {
        console.error(err)
        return NextResponse.json({
            message: "server error"
        }, {status: 500})
    }
}

