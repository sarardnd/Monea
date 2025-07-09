import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import MoneaPlus from "./pages/MoneaPlus.jsx";
import Graficos from "./pages/Graficos.jsx";
import Filtros from "./pages/Filtros.jsx";
import Todo from "./pages/Todo.jsx";
import { GastosProvider } from "./context/GastosContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GastosProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/monea-plus" element={<MoneaPlus />} />
          <Route path="/monea-plus/graficos" element={<Graficos />} />
          <Route path="/monea-plus/filtros" element={<Filtros />} />
          <Route path="/monea-plus/todo" element={<Todo />} />
        </Routes>
      </GastosProvider>
    </BrowserRouter>
  </StrictMode>
);
