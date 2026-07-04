import { AddMoney } from "@/components/Addmoney";
import ShowBalance from "@/components/Showbalance";

export default function Transfer() {
    return (
        <>
            <div className="m-4 p-2">
                <div className="font-bold text-3xl text-purple-800 m-5">Transfer</div>
                <div className="flex gap-15">
                    <div className="flex-1/8">
                        <AddMoney />
                    </div>
                    <div className="flex-1">
                        <ShowBalance />
                    </div>

                </div>
            </div>
        </>
    )
}