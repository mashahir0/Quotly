import { createBrowserRouter, RouterProvider } from "react-router-dom";
import userRoutes from "./domain/routes/userRoute";
import adminRoutes from "./domain/routes/adminRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const routes = [...userRoutes,...adminRoutes  ]
  const router = createBrowserRouter(routes)
  const GOOGLE_CLIENT_ID='296807436374-9fofl6fhm8u6g57d1ad18lipjpjd1h7t.apps.googleusercontent.com'
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
    
  );
}

export default App;
