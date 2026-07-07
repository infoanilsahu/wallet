"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import axios from "axios";

interface P2PTransactionProps {
    amount: number
    timeStamp: string
    otherNumber: string
    status: "sent" | "received"
}

export function P2PTransaction() {

    const {data: session, status} = useSession()

    const [transactions, setTransactions] = useState<P2PTransactionProps[]>([])

    async function loadData() {
        try {

            if( !session ) return;

            const res = await axios.get(`http://localhost:3000/api/getp2ptransfer?userid=${session.user.id}`)

            if( res.status === 200 ) {
                const { p2p } = res.data
                setTransactions(p2p)
            }
            
        } catch (er) {
            console.log(er);
        }
    }

    useEffect(() => {
        loadData()
    }, [status, session])


  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="ring-0 py-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">P2P Transactions</CardTitle>
          <CardDescription className="text-gray-600">
            Your peer-to-peer transaction history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No transactions found
              </div>
            ) : (
              transactions.map((tx, index) => (
                <div
                  key={`${tx.timeStamp}-${index}`}
                  className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center
                        ${
                        tx.status === "sent"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-gray-900 text-white"
                        }
                      `}
                    >
                      <span className="font-bold text-lg">
                        {tx.status === "sent" ? "↓" : "↑"}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-black">
                        {tx.otherNumber}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(tx.timeStamp)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold text-lg
                        ${tx.status === "sent" ? "text-gray-700" : "text-black"}
                      `}
                    >
                      {tx.status === "sent" ? "-" : "+"}{" "}
                      {formatCurrency(tx.amount)}
                    </p>
                    <p
                      className={`text-sm font-medium ${tx.status === "sent" ? "text-gray-500" : "text-gray-700"}`}
                    >
                      {tx.status}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}



const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount)
}

const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    })
}