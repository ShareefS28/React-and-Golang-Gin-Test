import { Routes, Route } from "react-router-dom";
import {
  Login,
  Register,
  Welcome
} from "./pages"
import ProtectedRoute from "./components/ProtectRoutes";

function App() {
  const protectedRoutes = [
    { path: "/welcome", element: <Welcome /> },
  ]

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {protectedRoutes.map((route) => (
        <Route 
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute>
              {route.element}
            </ProtectedRoute>
          }
        />
      ))}
    </Routes>
  );
}

export default App;