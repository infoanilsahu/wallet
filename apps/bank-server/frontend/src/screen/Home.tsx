import { useState } from "react"
import { useParams, useSearchParams } from "react-router"

export function Home() {
    const { bank } = useParams();
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const amount = searchParams.get("amu")

    const [bankId, setBankId] = useState("")
    const [password, setPassword] = useState("")

    function handlePay() {
        console.log("Test payment", { bank, token, amount, bankId, password })
    }

    function handleCancel() {
        setBankId("")
        setPassword("")
        console.log("Test payment cancelled", { bank, token, amount })
    }

    return (
        <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-slate-200">
                <div className="mb-8 text-center">
                    <p className="text-sm uppercase tracking-wide text-slate-500">Pay to</p>
                    <h1 className="mt-1 text-3xl font-semibold capitalize text-slate-900">
                        {bank?.toLocaleUpperCase() ?? "Unknown bank"}
                    </h1>
                    <p className="mt-3 text-4xl font-bold text-emerald-600">
                        ₹{amount ?? "0"}
                    </p>
                </div>

                <div className="space-y-5">
                    <label className="block">
                        <div className="mb-2 flex items-center justify-between gap-3">
                            <span className="text-sm font-medium text-slate-700">Bank ID</span>
                            <span className="text-xs text-amber-600">For test purpose only</span>
                        </div>
                        <input
                            type="text"
                            value={bankId}
                            onChange={(e) => setBankId(e.target.value)}
                            placeholder="E1234567890 (type any thing)"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        />
                    </label>

                    <label className="block">
                        <div className="mb-2 flex items-center justify-between gap-3">
                            <span className="text-sm font-medium text-slate-700">Password</span>
                            <span className="text-xs text-amber-600">For test purpose only</span>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        />
                    </label>

                    <div className="mt-2 flex gap-3">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handlePay}
                            className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-emerald-700"
                        >
                            Pay
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
