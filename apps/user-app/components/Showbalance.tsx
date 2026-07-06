"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";


export default function ShowBalance() {
  
  const [lockBalance, setLockBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const {data:session, status} = useSession()

  async function loadBalance() {
    if(!session) {
      return;
    }

    try {

      const res = await axios.get(`http://localhost:3000/api/getbalance?userid=${session.user.id}`)
      
      if( res.status === 200 ) {
        const { lockBalance, amount } = res.data
        setAmount(amount)
        setLockBalance(lockBalance)
        setTotalBalance(amount+lockBalance)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadBalance()
  },[status, session])

  return (
    <Card className="w-full mx-auto bg-white ring-gray-200">
      <CardHeader>
        <CardTitle className="text-black text-2xl font-bold">Account Balance</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between items-center pt-1 px-4  rounded-lg">
          <span className="text-black font-medium">Amount</span>
          <span className="text-black text-lg">{amount}</span>
        </div>

        <div className="flex justify-between items-center pt-1 px-4 rounded-lg">
          <span className="text-black font-medium">Lock Balance</span>
          <span className="text-black  text-lg">{lockBalance}</span>
        </div>

        <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg border border-gray-300">
          <span className="text-black font-medium">Total Balance</span>
          <span className="text-black font-bold text-lg">{totalBalance}</span>
        </div>
      </CardContent>
    </Card>
  );
}