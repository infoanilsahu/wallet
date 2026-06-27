import express, { Request, Response } from "express"
import { bankRes } from "./validation/hdfc";
import { prisma } from "@repo/db";
const app = express()


const port = process.env.PORT ?? 3003;

app.post("/hdfc", async (req:Request, res:Response) => {
    // check responce from hdfc backend
    const parse = bankRes.safeParse(req.body)
    if( !parse.success ) {
        return res.status(403).json({
            message: "not get required data"
        })
    }

    try {
        const { amount, token: reqToken, userId: reqUserId } = parse.data

        await prisma.$transaction(async (tx) => {
            await tx.balance.update({
                where: {userId: reqUserId},
                data: {
                    amount: {
                        increment: amount
                    }
                }
            })

            await tx.onRampTransaction.update({
                where: { token: reqToken },
                data: {
                    status: "Success"
                }
            })
        })

        return res.status(200).json({
            message: "captured"
        })

    } catch (e) {
        console.error(e)
        return res.status(411).json({
            message: "Error while processing webhook"
        })
    }


})

app.listen(port, () => console.log(`server is running on ${port} !`))