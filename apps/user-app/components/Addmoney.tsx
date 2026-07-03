"use client"
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { useState } from "react";

export function AddMoney() {
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState<string | null>("");

  const handleAddMoney = () => {
    console.log("Adding money:", amount, "to bank:", bank);
    // Add your money addition logic here
  };

  return (
    <Card className="w-full mx-auto bg-white ring-gray-200 shadow-lg ">
      <CardHeader>
        <CardTitle className="text-black text-2xl">Add Money</CardTitle>
        <CardDescription className="text-gray-600">
          Add money to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="amount" className="teblackfocus:border-xt-sm font-medium text-black">
            Amount
          </label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border-gray-300 focus:ring-black focus:ring-0 "
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="bank" className="text-sm font-medium text-black">
            Bank
          </label>
          <Select value={bank} onValueChange={(value) => setBank(value)}>
            <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black">
              <SelectValue placeholder="Select bank" />
            </SelectTrigger>
            <SelectContent className="bg-white ">
              <SelectItem value="hdfc">HDFC</SelectItem>
              <SelectItem value="axis">Axis</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleAddMoney}
          className="w-full bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Add Money
        </Button>
      </CardContent>
    </Card>
  );
}