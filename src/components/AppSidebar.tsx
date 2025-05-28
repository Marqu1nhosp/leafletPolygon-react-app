import { Map, PlusCircle, List, LogOut, MapPin } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useContext } from "react"
import { AuthContext } from "@/context/auth"

// Menu items relacionados ao projeto
const items = [
    {
        title: "Mapa",
        url: "/mapa",
        icon: Map,
    },
    {
        title: "Novo Estabelecimento",
        url: "/map-leaflet",
        icon: PlusCircle,
    },
    {
        title: "Gerenciar Estabelecimentos",
        url: "/manage-location",
        icon: MapPin,
    },
    {
        title: "Estabelecimentos",
        url: "/establishments",
        icon: List,
    },
    {
        title: "Sair",
        url: "/logout",
        icon: LogOut,
    },
]

export function AppSidebar() {
    const { signOut } = useContext(AuthContext)
    return (
        <div className="text-white">
            <Sidebar className="bg-slate-800">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xl mb-4">Leaflet Polygon</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            {item.title === "Sair" ? (
                                                <button
                                                    onClick={() => signOut()}
                                                    className="flex items-center gap-2 w-full text-left"
                                                    type="button"
                                                >
                                                    <item.icon className="h-5 w-5" />
                                                    <span>{item.title}</span>
                                                </button>
                                            ) : (
                                                <a href={item.url} className="flex items-center gap-2">
                                                    <item.icon className="h-5 w-5" />
                                                    <span>{item.title}</span>
                                                </a>
                                            )}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </div>
    )
}
