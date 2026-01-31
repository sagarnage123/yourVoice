import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@/routes/AppRoutes";
import { AuthProvider } from "@/context/AuthContext";
import "./index.css";
import { Toaster } from "react-hot-toast";

    export default function App() {
    return (
      <BrowserRouter>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#0f172a",
                color: "#fff",
              },
            }}
          />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>

    );
  }


