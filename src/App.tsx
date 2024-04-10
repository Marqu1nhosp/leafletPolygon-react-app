
import { AuthProvider } from "./context/auth";
import { AppRoutes } from "./routes";

export function App() {
  return (
   <AuthProvider>
        <AppRoutes />
   </AuthProvider>
  );
}
