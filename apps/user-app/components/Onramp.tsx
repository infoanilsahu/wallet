"use client";

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@repo/ui/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@repo/ui/components/ui/select";
import { Button } from "@repo/ui/components/ui/button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface OnRampTransaction {
  id: string;
  token: string;
  provider: string;
  amount: number;
  startTime: Date;
  status: "Success" | "Fail" | "Processing";
}

interface OnRampData {
  onramp: OnRampTransaction[];
}

// Status badge component with black/white styling
function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    Success: {
      bg: "bg-black",
      text: "text-white",
      icon: CheckCircle,
    },
    Processing: {
      bg: "bg-black",
      text: "text-white",
      icon: Clock,
    },
    Fail: {
      bg: "bg-black",
      text: "text-white",
      icon: AlertCircle,
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Processing;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}

export function OnRamp() {
  const [onrampData, setOnRampData] = useState<OnRampData | null>(null);
  const [loading, setLoading] = useState(true);
 

  const { data: session, status } = useSession();

  async function fetchOnRampData() {
    try {
        const res = await axios.get(
          `http://localhost:3000/api/getonramp?userid=${session?.user?.id}`
        );
        if (res.status === 200) {
          const data = res.data as OnRampData;
          
          setOnRampData(data);
        }
      } catch (error) {
        console.error("Failed to fetch onramp data:", error);
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      setLoading(false);
      return;
    }

    fetchOnRampData();
  }, [session, status]);

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Onramp Transactions</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto ring-0 ">

      <CardContent className="p-6 space-y-6">
        
        {/* Transactions Table */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-4">Recent Transactions</h3>

          {onrampData?.onramp && onrampData.onramp.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-white border-b border-black">
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Amount (₹)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black">
                  {onrampData.onramp
                    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
                    .map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-100 transition-colors">
                        <td className="px-4 py-3 text-sm text-black">
                          {format(new Date(transaction.startTime), "PPpp")}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-black">
                          ₹{transaction.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-black">
                          <span className="font-medium">
                            {transaction.provider.charAt(0).toUpperCase() + transaction.provider.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={transaction.status} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-black">No onramp transactions found</p>
              <Button className="mt-4 bg-black text-white hover:bg-gray-800">
                Add Money
              </Button>
            </div>
          )}
        </div>
      </CardContent>

      
    </Card>
  );
}