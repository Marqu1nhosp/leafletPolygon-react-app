import { Link } from "react-router-dom";
import { TablePolygonLocation } from "../components/TablePolygonLocation";
import { PlusCircle } from "phosphor-react";


export function ManagePolygonLocation() {
    return (
        <>
            <div className="w-screen min-h-screen flex mt-20 md:mt-10 justify-center ">
                <div className="w-full max-w-4xl rounded-xl p-4 md:p-6">
                    <h1 className="text-center text-3xl font-semibold text-white">
                        Lista de Estabelecimentos
                    </h1>
                    <div className="flex flex-col gap-4 items-center sm:items-start mt-10">
                        <div className="w-full max-w-xs sm:max-w-[11rem]">
                            <Link
                                to="/map-leaflet"
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded flex items-center justify-center sm:justify-start"
                            >
                                <PlusCircle className="mr-2" /> Adicionar
                            </Link>
                        </div>
                        <div className="w-full">
                            <TablePolygonLocation />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}