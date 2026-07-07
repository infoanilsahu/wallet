import { P2PTransaction } from "@/components/P2ptransaction";
import { SendMoney } from "../../components/Sendmoney";

export default function P2PTransfer() {
    return (
        <>
        <div className="m-4 p-2">
            <div className="font-bold text-3xl text-purple-800 m-5">P2P Transfer</div>
            <div className="m-2 flex ">
                <SendMoney className="w-[500px] "/>
                <P2PTransaction />
            </div>
        </div>
        </>
    )
}