import { Button } from "./button";
import { Wallet2Icon } from "lucide-react";

interface AppbarProps {
    user?: {
        name?: string | null;
    },

    onSignin: () => void,
    onSignout: () => void

}

export function AppBar({user, onSignin, onSignout}: AppbarProps) {
    return <div className="flex justify-between border-b px-4">
        <div className="text-2xl font-bold text-purple-800 flex items-center justify-center">
            <span>Wallet</span>
            <span><Wallet2Icon /></span>
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}

