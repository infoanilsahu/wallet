"use client"
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface P2PProp {
    className: string;
}

export function SendMoney({className}: P2PProp) {
  const [userNumber, setUserNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");

  const {data: session, status} = useSession()
  const nevigate = useRouter()

  const handleTransfer = async () => {
    if( !session ) return;
    
    try {

      const res = await axios.post("http://localhost:3000/api/transfermoney", {
        phone: userNumber,
        amount: Number(amount),
        userId: session.user.id,
        password
      })

      if( res.status === 200 ) {
        alert("transcation successfully completed")
      }
      
    } catch (err) {
      console.log(err);
      
    }
  };

  return (
    <Card className={`${className} mx-auto bg-white ring-gray-200 shadow-lg`}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="userNumber" className="text-sm font-medium text-black">
            User Number
          </label>
          <Input
            id="userNumber"
            type="text"
            placeholder="Enter recipient number"
            value={userNumber}
            onChange={(e) => setUserNumber(e.target.value)}
            className="w-full border-gray-300 focus:border-black focus:ring-0"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium text-black">
            Amount
          </label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border-gray-300 focus:border-black focus:ring-0"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-black">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Enter transfer password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-gray-300 focus:border-black focus:ring-0"
          />
        </div>

        <Button
          onClick={handleTransfer}
          className="w-full bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Transfer
        </Button>
      </CardContent>
    </Card>
  );
}



