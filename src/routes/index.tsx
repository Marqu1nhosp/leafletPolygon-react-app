import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import Register from "../pages/Register";
import { Map } from "../pages/Map";
import { PrivateRoute } from "./privateRoutes";
import { ManagePolygonLocation } from "../pages/ManagePolygonLocation";
import { EditPolygon } from "../pages/EditPolygon";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
             
               {/* Rotas privadas */}
               <Route path="/map-leaflet" element={<PrivateRoute />}>
                    <Route path="/map-leaflet" element={<Map />}/>
               </Route>
               <Route path="/manage-location" element={<PrivateRoute />}>
                    <Route path="/manage-location" element={<ManagePolygonLocation />}/>
               </Route>
               <Route path="/edit-polygon/:polygonId" element={<PrivateRoute />}>
                    <Route path="/edit-polygon/:polygonId" element={<EditPolygon />}/>
               </Route>

            </Routes>
        </BrowserRouter>
    );
}
