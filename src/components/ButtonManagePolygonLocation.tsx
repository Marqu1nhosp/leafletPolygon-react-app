import { Link } from "react-router-dom";

export function ButtonManagePolygonLocation(){
    return (
        <Link type="submit" to="/manage-location" className="bg-neutral-500 hover:bg-neutral-600 text-white font-bold py-2 px-16 rounded">Gerenciamento de locais</Link>
    )
}