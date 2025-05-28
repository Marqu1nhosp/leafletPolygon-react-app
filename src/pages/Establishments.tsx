import { api } from "@/api/axios";
import { AuthContext } from "@/context/auth";
import { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";


interface PolygonData {
    namePolygon: string
    coordinates: [number, number][]
    status: string
}



export function Establishments() {
    const { userId } = useContext(AuthContext)
    const [polygons, setPolygons] = useState<PolygonData[]>([])
    const [selectedPolygons, setSelectedPolygons] = useState<String[]>([])

    useEffect(() => {
        fetchPolygons()
    }, [])

    async function fetchPolygons() {
        try {
            const response = await api.get(`/polygon/${userId}`)
            console.log(response.data)
            const polygonsFromApi = response.data.polygons.map((polygon: PolygonData) => ({
                namePolygon: polygon.namePolygon,
                coordinates: Array.isArray(polygon.coordinates) ? polygon.coordinates : JSON.parse(polygon.coordinates)
            }))
            console.log("Dados dos polígonos recebidos:", polygonsFromApi)
            setPolygons(polygonsFromApi)
        } catch (error) {
            console.error("Erro ao buscar polígonos da API:", error)
        }
    }


    function handlePolygonSelection(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
        setSelectedPolygons(selectedOptions)
    }


    function handleShowAllPolygons() {
        setSelectedPolygons(polygons.map(polygon => polygon.namePolygon))
    }

    return (
        <>
            <div className="flex ">
                <div className="w-[30rem] h-[35rem] p-4">
                    <MapContainer
                        center={[-14.8611, -40.8442]}
                        zoom={13}
                        className="w-full h-full"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {polygons.map((polygon, index) =>
                            selectedPolygons.includes(polygon.namePolygon) ? (
                                <Polygon key={index} pathOptions={{ color: "blue" }} positions={polygon.coordinates} />
                            ) : null
                        )}
                        {/* {userClickedCoordinates.length > 0 && (
                            <Polygon pathOptions={{ color: "red" }} positions={userClickedCoordinates} />
                        )} */}
                        {/* <MapClickHandler onMapClick={handleMapClick} /> */}
                    </MapContainer>
                </div>
                {/* <div className="flex flex-col items-center justify-center gap-10 md:w-[40vw] w-full px-4 py-6 md:py-8 md:ml-8">
                    {/* <FormRegisterPolygon
                        onSubmit={handleCreatePolygon}
                        errorCoordinates={errorCoordinates}
                        polygons={polygons}
                        handlePolygonSelection={handlePolygonSelection}
                        selectedPolygons={selectedPolygons}
                        onShowAllPolygons={handleShowAllPolygons}
                    /> 



                <Toaster
                    toastOptions={{
                        style: { background: "green", color: "white" },
                        className: "my-toast",
                    }}
                    closeButton
                />
            </div> */}
                <div className="mt-28">
                    <div className="">
                        <form
                            className="flex flex-col gap-4 max-w-md w-full mx-auto px-4 sm:px-6"
                        >
                            <div className="flex flex-col gap-1">

                                <button
                                    type="button"
                                    onClick={handleShowAllPolygons}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 rounded w-full transition-colors"
                                >
                                    Visualizar todos
                                </button>

                                <select
                                    id="polygons"
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 rounded w-full transition-colors"
                                    value={selectedPolygons.length > 0 ? selectedPolygons[0].toString() : ""}
                                    onChange={handlePolygonSelection}
                                >
                                    <option value="">Selecione um polígono</option>
                                    {polygons.map((polygon, index) => (
                                        <option key={index} value={polygon.namePolygon}>
                                            {polygon.namePolygon}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
            </div >

        </>
    )
}