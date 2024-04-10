import { Link } from "react-router-dom";
import { ButtonLogout } from "../components/ButtonLogout";
import { TablePolygonLocation } from "../components/TablePolygonLocation";

export function ManagePolygonLocation() {
    return (
        <div className="mt-20 flex flex-col gap-3 mx-3">
            <div>
                <ButtonLogout />
                <TablePolygonLocation />
            </div>
            <div>
                <Link type="submit" to="/map-leaflet" className="bg-green-500 hover:bg-green-600 text-white font-bold py-1.5 px-14 rounded ">Adicionar local</Link>
            </div>
        </div>
    )
}