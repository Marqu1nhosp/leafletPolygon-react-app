
import { ButtonLogout } from "../components/ButtonLogout";
import { MapComponent } from "../components/MapComponent";
//import { FormRegisterPolygon } from "./FormRegisterPolygon";

export function Map() {
   return (
      <>
         <ButtonLogout />
         <div className="flex flex-row items-center">
            <MapComponent />
         </div>
      </>
   );
}


