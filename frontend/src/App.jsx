import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register.jsx";
import Forget from "./pages/Forget";

function App() {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forget",
      element: <Forget />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
