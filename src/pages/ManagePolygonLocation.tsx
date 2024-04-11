import { Link } from "react-router-dom";
import { ButtonLogout } from "../components/ButtonLogout";
import { TablePolygonLocation } from "../components/TablePolygonLocation";
import { PlusCircle } from "phosphor-react";

export function ManagePolygonLocation() {
    return (
        <div className="mt-20 flex flex-col gap-3 mx-3">
            <h1 className="text-center text-3xl font-semibold text-zinc-400">Lista de Estabelecimentos</h1>
            <div>
                <ButtonLogout />
                <TablePolygonLocation />
            </div>
            <div className="w-44">
                <Link to="/map-leaflet" className="bg-green-500 hover:bg-green-600 text-white font-bold py-1.5 px-10 rounded flex items-center">
                    <PlusCircle className="mr-2" /> Adicionar
                </Link>
            </div>
        </div>
    )
}