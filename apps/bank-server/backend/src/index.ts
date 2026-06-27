import express, { type Request, type Response } from "express";
import cors from "cors";
import jwt, { type JwtPayload } from "jsonwebtoken";
import axios from "axios";

const app = express()


const port = process.env.PORT ?? 5000;

app.use(cors())
app.use(express.json())

app.post("/getservertoken", async (req:Request, res:Response) => {
    try {
        const { bank, amount, userId } = req.body
    
        const token = await jwt.sign({
            userId, amount, bank
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

    const verifyToken = await jwt.verify(token, "banksecret")
    if( verifyToken ) {
        const { userId, amount, bank } = verifyToken as JwtPayload

        const response = await axios.post(`http://localhost:3004/${bank}`, {
           amount, userId, bank 
        })

        if( response.status == 200 ) {
            return res.status(200).json({
                message: "transcation successfully completed"
            })
        }
        else return res.status(400).json({
            message: "transcation cancelled "
        })
    }
    else {

        const response = await axios.get("http://localhost:3004/canceltranscation")

        return res.status(400).json({
            message: "transcation cancelled "
        })
    }
})

app.listen(port, () => console.log(`server is running ${port}`))