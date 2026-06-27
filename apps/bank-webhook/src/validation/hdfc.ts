import { int, object, string } from "zod";

export const bankRes = object({
    token: string(),
    userId: string(),
    amount: int()
})