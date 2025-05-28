// src/routes/index.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import Register from "../pages/Register";
import { Map } from "../pages/Map";
import { PrivateRoute } from "./privateRoutes";
import { ManagePolygonLocation } from "../pages/ManagePolygonLocation";
import { EditPolygon } from "../pages/EditPolygon";
import Layout from "@/components/Layout";
import { Establishments } from "@/pages/Establishments";


export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Públicas */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Privadas com Sidebar */}
                <Route path="/map-leaflet" element={<PrivateRoute />}>
                    <Route
                        path="/map-leaflet"
                        element={
                            <Layout>
                                <Map />
                            </Layout>
                        }
                    />
                </Route>

                <Route path="/manage-location" element={<PrivateRoute />}>
                    <Route
                        path="/manage-location"
                        element={
                            <Layout>
                                <ManagePolygonLocation />
                            </Layout>
                        }
                    />
                </Route>

                <Route path="/establishments" element={<PrivateRoute />}>
                    <Route
                        path="/establishments"
                        element={
                            <Layout>
                                <Establishments />
                            </Layout>
                        }
                    />
                </Route>

                <Route path="/edit-polygon/:polygonId" element={<PrivateRoute />}>
                    <Route
                        path="/edit-polygon/:polygonId"
                        element={
                            <Layout>
                                <EditPolygon />
                            </Layout>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
