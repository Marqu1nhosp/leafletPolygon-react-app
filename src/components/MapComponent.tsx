import { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Polygon, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import FormRegisterPolygon from "./FormRegisterPolygon";
import { api } from "../api/axios";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";

interface PolygonData {
  namePolygon: string;
  coordinates: [number, number][];
}

export function MapComponent() {
  const { userId } = useContext(AuthContext);
  console.log(userId)
  const [userClickedCoordinates, setUserClickedCoordinates] = useState<[number, number][]>([]);
  const [polygons, setPolygons] = useState<PolygonData[]>([]);
  const [selectedPolygons, setSelectedPolygons] = useState<string[]>([]);
  const [errorCoordinates, setErrorCoordinates] = useState('');

  function handleMapClick(e: L.LeafletMouseEvent) {
    const { lat, lng } = e.latlng;
    setUserClickedCoordinates(prevState => [...prevState, [lat, lng]]);
  }

  useEffect(() => {
    fetchPolygons();
  }, []);

  async function fetchPolygons() {
    try {
      const response = await api.get(`/polygon/${userId}`);
      console.log(response.data)
      const polygonsFromApi = response.data.polygons.map((polygon: PolygonData) => ({
        namePolygon: polygon.namePolygon,
        coordinates: Array.isArray(polygon.coordinates) ? polygon.coordinates : JSON.parse(polygon.coordinates)
      }));
      console.log("Dados dos polígonos recebidos:", polygonsFromApi);
      setPolygons(polygonsFromApi);
    } catch (error) {
      console.error("Erro ao buscar polígonos da API:", error);
    }
  }

  async function handleCreatePolygon(data: { namePolygon: string }) {
    const { namePolygon } = data;

    if (userClickedCoordinates.length === 0) {
      setErrorCoordinates("Nenhuma coordenada de polígono foi registrada.");
      return;
    }
    if (userClickedCoordinates.length < 3) {
      setErrorCoordinates("São necessárias pelo menos 3 coordenadas para formar um polígono.");
      return;
    }

    setPolygons(prevState => [{ namePolygon: namePolygon, coordinates: userClickedCoordinates }, ...prevState]);
    setUserClickedCoordinates([]);
    console.log(polygons)

    const coordinatesFormatted = `[${userClickedCoordinates
      .map(coord => `[${coord[0]}, ${coord[1]}]`)
      .join(", ")}]`;

    try {
      await api.post('polygon', {
        userId,
        namePolygon,
        coordinates: coordinatesFormatted,
      });
      console.log("Dados do polígono enviados com sucesso para a API.");
    } catch (error) {
      console.error("Erro ao enviar dados do polígono para a API:", error);
    }
  }

  function handlePolygonSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedPolygons(selectedOptions);
  }

  function handleShowAllPolygons() {
    setSelectedPolygons(polygons.map(polygon => polygon.namePolygon));
  }

  return (
    <>
      <div className="h-screen w-screen flex justify-center">
        <MapContainer center={[-14.8611, -40.8442]} zoom={13} className="h-[90vh] w-[65vw] mt-8">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {polygons.map((polygon, index) => (
            (selectedPolygons.includes(polygon.namePolygon)) &&
            <Polygon key={index} pathOptions={{ color: 'blue' }} positions={polygon.coordinates} />
          ))}
          {userClickedCoordinates.length > 0 && (
            <Polygon pathOptions={{ color: 'red' }} positions={userClickedCoordinates} />
          )}
          <MapClickHandler onMapClick={handleMapClick} />
        </MapContainer>
      </div>

      <div className="flex flex-col items-center justify-center gap-20 mr-16">
        <div>
          <FormRegisterPolygon
            onSubmit={handleCreatePolygon}
            errorCoordinates={errorCoordinates}
            polygons={polygons}
            handlePolygonSelection={handlePolygonSelection}
            selectedPolygons={selectedPolygons}
            onShowAllPolygons={handleShowAllPolygons}
          />
        </div>
        <div className="flex">
          <Link type="submit" to="/manage-location" className="bg-neutral-500 hover:bg-neutral-600 text-white font-bold py-2 px-16 rounded">Gerenciamento de locais</Link>
        </div>

      </div>
    </>
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
