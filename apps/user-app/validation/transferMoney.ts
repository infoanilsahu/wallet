import { object, string, number } from "zod";

export const TransMoney = object({
    phone: string(),
    password: string(),
    amount: number(),
    userId: string()
})