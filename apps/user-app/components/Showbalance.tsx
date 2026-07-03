import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";


export interface ShowBalanceProp {
  unlockBalance: number;
  lockBalance: number;
}

export default function ShowBalance({ unlockBalance, lockBalance }: ShowBalanceProp) {
  const totalBalance = unlockBalance + lockBalance;

  return (
    <Card className="w-full mx-auto bg-white ring-gray-200">
      <CardHeader>
        <CardTitle className="text-black text-2xl font-bold">Account Balance</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between items-center pt-1 px-4  rounded-lg">
          <span className="text-black font-medium">Unlock Balance</span>
          <span className="text-black text-lg">{unlockBalance}</span>
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