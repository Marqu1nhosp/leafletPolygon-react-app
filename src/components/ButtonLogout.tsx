import { useContext } from "react"
import { AuthContext } from "../context/auth"
import { SignOut } from "phosphor-react"

export function ButtonLogout() {
    const { signOut } = useContext(AuthContext)

    return (
        <button onClick={signOut} className="absolute top-0 right-0 m-4 bg-slate-800 text-white font-bold py-2 px-4 rounded">
            <SignOut size={32} />
        </button>
    )
}