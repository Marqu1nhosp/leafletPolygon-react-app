import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MapContainer, TileLayer, Polygon, useMapEvents } from "react-leaflet";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { AuthContext } from "../context/auth";
import { api } from "../api/axios";
import { ButtonManagePolygonLocation } from "../components/ButtonManagePolygonLocation";
import { format } from "date-fns";


const editPolygonFormSchema = z.object({
    namePolygon: z
        .string()
        .nonempty('O nome é obrigatório'),
    status: z.string(),
})

type EditPolygon = z.infer<typeof editPolygonFormSchema>

interface PolygonData {
    id: string
    namePolygon: string;
    coordinates: number[][];
    createdAt?: string;
    status: string;
}

export function EditPolygon() {
    const { userId } = useContext(AuthContext)
    const [userClickedCoordinates, setUserClickedCoordinates] = useState<[number, number][]>([]);
    const [errorValidation, setErrorValidation] = useState('')
    const [polygon, setPolygon] = useState<PolygonData[]>([]);
    const { register, handleSubmit } = useForm<EditPolygon>();
    const { polygonId } = useParams<{ polygonId: string }>();

    useEffect(() => {
        const fetchPolygon = async () => {
            try {
                const response = await api.get(`/polygon-id/${polygonId}`);
                const polygonFromApi = response.data.polygons.map((polygon: PolygonData) => ({
                    id: polygon.id,
                    namePolygon: polygon.namePolygon,
                    coordinates: Array.isArray(polygon.coordinates) ? polygon.coordinates : JSON.parse(polygon.coordinates),
                    createdAt: polygon.createdAt ? format(new Date(polygon.createdAt), 'dd/MM/yyyy') : '',
                    status: polygon.status,
                }));
                setPolygon(polygonFromApi);
                //setUserClickedCoordinates(polygonsFromApi[0]?.coordinates || []);
                console.log(polygon)
            } catch (error) {
                console.error("Erro ao buscar polígonos da API:", error);
            }
        };

        fetchPolygon();
    }, [userId]);


    function handleMapClick(e: L.LeafletMouseEvent) {
        const { lat, lng } = e.latlng;
        setUserClickedCoordinates(prevState => [...prevState, [lat, lng]]);
    }

    const coordinatesFormatted = `[${userClickedCoordinates
        .map(coord => `[${coord[0]}, ${coord[1]}]`)
        .join(", ")}]`;

    async function handleSubmitEdit(data: EditPolygon) {
        const { namePolygon, status } = data;

        if (!namePolygon.trim()) {
            setErrorValidation('Preencha o nome do polígono por favor');
            return;
        }

        if (!coordinatesFormatted.trim()) {
            setErrorValidation('Selecione pelo menos três coordenadas no mapa.');
            return;
        }

        try {
            await api.patch(`/polygon/${polygonId}`, {
                namePolygon,
                coordinates: coordinatesFormatted,
                status,
                createdAt: polygon[0]?.createdAt,
                userId
            });
            console.log("Polígono editado com sucesso!");
        } catch (error) {
            console.error("Erro ao editar polígono:", error);
        }
    }

    return (
        <div className="flex flex-row items-center gap-3">
            <div>
                <MapContainer center={[-14.8611, -40.8442]} zoom={13} className="h-[90vh] w-[65vw] mt-8">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {userClickedCoordinates.length > 0 && (
                        <Polygon pathOptions={{ color: 'red' }} positions={userClickedCoordinates} />
                    )}
                    <MapClickHandler onMapClick={handleMapClick} />
                </MapContainer>
            </div>
            <div className="flex flex-col gap-20">
                <form onSubmit={handleSubmit(handleSubmitEdit)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <div>
                            <label htmlFor="" className="text-zinc-500 font-bold">Nome do polígono</label>
                        </div>
                        <div>
                            <input {...register('namePolygon')} type="text" defaultValue={polygon[0]?.namePolygon} className="bg-slate-700 w-80 rounded-md p-1.5 mr-1.5 text-white" />
                        </div>
                        <span className="text-red-600 text-sm">
                            {errorValidation}
                        </span>
                        <div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div>
                            <label htmlFor="" className="text-zinc-500 font-bold">Status</label>
                        </div>
                        <div>
                            <select {...register('status')} id="polygonStatus" defaultValue={polygon[0]?.status} className="bg-slate-700 w-80 rounded-md p-1.5 mr-1.5 text-white">
                                <option value="Ativo">Ativo</option>
                                <option value="Inativo">Inativo</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-1.5 px-1.5 rounded w-80">Salvar</button>
                    </div>
                </form>
                <div className="flex">
                    <ButtonManagePolygonLocation />
                </div>
            </div>
        </div>

    );
}

interface MapClickHandlerProps {
    onMapClick: (e: L.LeafletMouseEvent) => void;
}

function MapClickHandler({ onMapClick }: MapClickHandlerProps) {
    useMapEvents({
        click: (e) => {
            onMapClick(e);
        },
    });

    return null;
}
