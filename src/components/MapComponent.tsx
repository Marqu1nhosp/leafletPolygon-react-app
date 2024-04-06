import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polygon, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import FormRegisterPolygon from "./FormRegisterPolygon";

interface PolygonData {
  name: string;
  coordinates: [number, number][];
}

export function MapComponent() {
  const [userClickedCoordinates, setUserClickedCoordinates] = useState<[number, number][]>([]);
  const [polygons, setPolygons] = useState<PolygonData[]>([]);
  const [selectedPolygons, setSelectedPolygons] = useState<string[]>([]);
  const [errorCoordinates, setErrorCoordinates] = useState('');

  function handleMapClick (e: L.LeafletMouseEvent){
    const { lat, lng } = e.latlng;
    setUserClickedCoordinates(prevState => [...prevState, [lat, lng]]);
  }

  function handleCreatePolygon(data: { namePolygon: string }) {
    const { namePolygon } = data;
    if (userClickedCoordinates.length === 0) {
      setErrorCoordinates("Nenhuma coordenada de polígono foi registrada.");
      return;
    }
    if (userClickedCoordinates.length < 3) {
      setErrorCoordinates("São necessárias pelo menos 3 coordenadas para formar um polígono.");
      return;
    }
    setPolygons(prevState => [{ name: namePolygon, coordinates: userClickedCoordinates }, ...prevState]);
    setUserClickedCoordinates([]);
  }

  useEffect(() => {
    console.log("Polígonos", polygons);
  }, [polygons]);

  function handlePolygonSelection(e: React.ChangeEvent<HTMLSelectElement>){
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedPolygons(selectedOptions);
  }

  function handleShowAllPolygons() {
    setSelectedPolygons(polygons.map(polygon => polygon.name));
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
            (selectedPolygons.includes(polygon.name)) &&
            <Polygon key={index} pathOptions={{ color: 'blue' }} positions={polygon.coordinates} />
          ))}
          {userClickedCoordinates.length > 0 && (
            <Polygon pathOptions={{ color: 'red' }} positions={userClickedCoordinates} />
          )}
          <MapClickHandler onMapClick={handleMapClick} />
        </MapContainer>
      </div>

      <div className="flex flex-col items-center justify-center">
        <FormRegisterPolygon
          onSubmit={handleCreatePolygon}
          errorCoordinates={errorCoordinates}
          polygons={polygons}
          handlePolygonSelection={handlePolygonSelection}
          selectedPolygons={selectedPolygons}
          onShowAllPolygons={handleShowAllPolygons}
        />
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
