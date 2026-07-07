import { OnRamp } from "@/components/Onramp";
import { P2P } from "./../../components/P2ptransfer";

export default function P2PTransfer() {
    return (
        <>
        <div className="m-4 p-2">
            <div className="font-bold text-3xl text-purple-800 m-5">P2P Transfer</div>
            <div className="m-2 ">
                <P2P className="w-[500px] "/>
            </div>
        </div>
        </>
    )
}