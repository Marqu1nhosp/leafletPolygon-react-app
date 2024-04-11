import { Pencil, Trash } from "phosphor-react"
import { AuthContext } from "../context/auth"
import { useContext, useEffect, useState } from "react"
import { api } from "../api/axios"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from 'sonner'

interface PolygonData {
    id: string
    namePolygon: string
    coordinates: number[][]
    createdAt?: string
    status: string
}

export function TablePolygonLocation() {
    const { userId } = useContext(AuthContext)
    const [polygons, setPolygons] = useState<PolygonData[]>([])
   const navigate = useNavigate()
    useEffect(() => {
        const fetchPolygons = async () => {
            try {
                const response = await api.get(`/polygon/${userId}`)
                const polygonsFromApi = response.data.polygons.map((polygon: PolygonData) => ({
                    id: polygon.id,
                    namePolygon: polygon.namePolygon,
                    coordinates: Array.isArray(polygon.coordinates) ? polygon.coordinates : JSON.parse(polygon.coordinates),
                    createdAt: polygon.createdAt ? format(new Date(polygon.createdAt), 'dd/MM/yyyy') : '',
                    status: polygon.status, 
                }))
                setPolygons(polygonsFromApi)
                console.log(polygons)
            } catch (error) {
                console.error("Erro ao buscar polígonos da API:", error)
            }
        }

        fetchPolygons()
    }, [userId])

    async function handleDelete(polygonId: string) {
        try {
            await api.delete(`/polygon/${polygonId}`)
            setPolygons(polygons.filter(polygon => polygon.id !== polygonId))
            toast.success("Polígono deletado com sucesso!")
        } catch (error) {
            console.error("Erro ao deletar polígono:", error)
            toast.error("Erro ao deletar polígono")
        }
    }

    async function handleEdit(polygonId: string){
        navigate(`/edit-polygon/${polygonId}`)
        console.log(polygonId)
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nome 
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Data cadastro
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {polygons.map((polygon) => (
                        <tr key={polygon.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {polygon.namePolygon}
                            </th>
                            <td className="px-6 py-4">
                                {polygon.createdAt || "-"}
                            </td>
                            <td className="px-6 py-4">
                                {polygon.status || "-"}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-row gap-1.5">
                                <button onClick={() => handleEdit(polygon.id)} className="font-medium text-blue-500 hover:text-blue-700"><Pencil size={32} /></button>
                                <button onClick={() => handleDelete(polygon.id)}  className="font-medium text-red-500 hover:text-red-700"><Trash size={32} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Toaster
                toastOptions={{
                    style: { background: 'red', color: 'white' },
                    className: 'my-toast',
                }}
                closeButton 
            />
        </div>

    )
} 