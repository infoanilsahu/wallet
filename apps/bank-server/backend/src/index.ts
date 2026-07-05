import express, { type Request, type Response } from "express";
import cors from "cors";
import jwt, { type JwtPayload } from "jsonwebtoken";
import axios from "axios";

const app = express()


const port = process.env.PORT ?? 5000;

app.use(cors())
app.use(express.json())

interface TokenProp extends JwtPayload {
    userId: string;
    token: string;
    amount: number;
}

app.post("/getservertoken", async (req:Request, res:Response) => {
    try {
        const { bank, amount, userId } = req.body
    
        const token = jwt.sign({
            userId, amount: Number(amount), bank
        }, "banksecret", {expiresIn: "1h"})
    
        return res.status(200).json({
            url: `http://localhost:5173/${bank}/credentials?token=${token}&amu=${amount}`,
            token: token,
        })
    
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "bank server is down"
        })
    }
})

app.post("/payment", async (req: Request, res:Response) => {
    const { token } = req.body

    const verifyToken = jwt.verify(token, "banksecret")
    if( verifyToken ) {
        const { userId, amount, bank } = verifyToken as TokenProp

        const response = await axios.post(`http://localhost:3003/${bank}`, {
           amount, userId, token 
        })

        if( response.status == 200 ) {
            return res.status(200).json({
                message: "transcation successfully completed"
            })
        }
    
    }

    return res.status(400).json({
        message: "transcation cancelled "
    })
    
})

app.post("/cancel", async (req: Request, res:Response) => {
    const { token } = req.body

    const verifyToken = jwt.verify(token, "banksecret")
    if( verifyToken ) {
        const { userId, amount, bank } = verifyToken as TokenProp

        const response = await axios.post(`http://localhost:3003/cancel`, {
           amount, userId, token 
        })

        if( response.status == 200 ) {
            return res.status(200).json({
                message: "transcation successfully cancel"
            })
        }
    
    }

    return res.status(400).json({
        message: "Error "
    })
    
})

app.listen(port, () => console.log(`server is running ${port}`))