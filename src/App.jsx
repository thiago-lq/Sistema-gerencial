import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaInicial from "./pages/PaginaInicial";
import Home from "./pages/Home";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<PaginaInicial/> }>
        </Route>

        <Route path="/home" element={<Home/> }>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
