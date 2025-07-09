import { createContext, useState, useEffect, useContext } from "react";

// Creamos el contexto
const GastosContext = createContext();

// Proveedor del contexto
export function GastosProvider({ children }) {
  const [gastos, setGastos] = useState([]);

  // Al cargar, trae de localStorage
  useEffect(() => {
    const data = localStorage.getItem("gastos");
    if (data) setGastos(JSON.parse(data));
  }, []);

  // Al cambiar, guarda en localStorage
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  return (
    <GastosContext.Provider value={{ gastos, setGastos }}>
      {children}
    </GastosContext.Provider>
  );
}

// Custom hook para consumir el contexto
export function useGastos() {
  return useContext(GastosContext);
}
