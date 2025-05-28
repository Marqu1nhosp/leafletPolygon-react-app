import { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Polygon, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import FormRegisterPolygon from "./FormRegisterPolygon";
import { api } from "../api/axios";
import { AuthContext } from "../context/auth";

import { toast, Toaster } from 'sonner'
import { ButtonBack } from "./ButtonBack";

interface PolygonData {
  namePolygon: string
  coordinates: [number, number][]
  status: string
}

export function MapComponent() {
  const { userId } = useContext(AuthContext)
  console.log(userId)
  const [userClickedCoordinates, setUserClickedCoordinates] = useState<[number, number][]>([])
  const [polygons, setPolygons] = useState<PolygonData[]>([])

  const [errorCoordinates, setErrorCoordinates] = useState('')

  function handleMapClick(e: L.LeafletMouseEvent) {
    const { lat, lng } = e.latlng
    setUserClickedCoordinates(prevState => [...prevState, [lat, lng]])
  }

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

  async function handleCreatePolygon(data: { namePolygon: string }) {
    const { namePolygon } = data

    if (userClickedCoordinates.length === 0) {
      setErrorCoordinates("Nenhuma coordenada de polígono foi registrada.")
      return
    }
    if (userClickedCoordinates.length < 3) {
      setErrorCoordinates("São necessárias pelo menos 3 coordenadas para formar um polígono.")
      return
    }

    setPolygons(prevState => [{ namePolygon: namePolygon, coordinates: userClickedCoordinates, status }, ...prevState])
    setUserClickedCoordinates([])
    console.log(polygons)

    const coordinatesFormatted = `[${userClickedCoordinates
      .map(coord => `[${coord[0]}, ${coord[1]}]`)
      .join(", ")}]`

    try {
      await api.post('polygon', {
        userId,
        namePolygon,
        coordinates: coordinatesFormatted,
        status: "Ativo"
      })
      toast.success("Local salvo com sucesso!")
    } catch (error) {
      console.error("Erro ao enviar dados do polígono para a API:", error)
    }
  }


  return (
    <>
      <div className="h-screen w-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16">

        <div className="flex justify-center md:flex-1 max-w-5xl h-[40vh] md:h-[80vh] min-h-[300px] mb-6 md:mb-0 w-full rounded-md overflow-hidden shadow-md">
          <MapContainer
            center={[-14.8611, -40.8442]}
            zoom={13}
            className="w-full h-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {userClickedCoordinates.length > 0 && (
              <Polygon pathOptions={{ color: "red" }} positions={userClickedCoordinates} />
            )}
            <MapClickHandler onMapClick={handleMapClick} />
          </MapContainer>
        </div>


        <div className="flex flex-col items-center justify-center gap-10 md:w-[40vw] w-full px-4 py-6 md:py-8 md:ml-8">
          <FormRegisterPolygon
            onSubmit={handleCreatePolygon}
            errorCoordinates={errorCoordinates}
            polygons={polygons}
          />

          <div className="flex justify-center w-full">
            <ButtonBack />
          </div>

          <Toaster
            toastOptions={{
              style: { background: "green", color: "white" },
              className: "my-toast",
            }}
            closeButton
          />
        </div>
      </div>
    </>

  )
}

interface MapClickHandlerProps {
  onMapClick: (e: L.LeafletMouseEvent) => void
}

function MapClickHandler({ onMapClick }: MapClickHandlerProps) {
  useMapEvents({
    click: (e) => {
      onMapClick(e)
    },
  })

  return null;
}
