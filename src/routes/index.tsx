import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import Register from "../pages/Register";
import { Map } from "../pages/Map";
import { PrivateRoute } from "./privateRoutes";
import { ManagePolygonLocation } from "../pages/ManagePolygonLocation";

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

            </Routes>
        </BrowserRouter>
    );
}
