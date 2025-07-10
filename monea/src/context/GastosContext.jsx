import { createContext, useState, useEffect, useContext } from "react";

const GastosContext = createContext();

export function GastosProvider({ children }) {
  const [gastos, setGastos] = useState([]);

  // ✅ Leer desde localStorage solo una vez
  useEffect(() => {
    try {
      const data = localStorage.getItem("gastos");
      if (data) {
        setGastos(JSON.parse(data));
      }
    } catch (e) {
      console.error("Error al leer de localStorage", e);
    }
  }, []);

  // ✅ Guardar en localStorage cada vez que cambie
  useEffect(() => {
    try {
      if (gastos.length > 0) {
        localStorage.setItem("gastos", JSON.stringify(gastos));
      }
    } catch (e) {
      console.error("Error al guardar en localStorage", e);
    }
  }, [gastos]);

  return (
    <GastosContext.Provider value={{ gastos, setGastos }}>
      {children}
    </GastosContext.Provider>
  );
}

export function useGastos() {
  return useContext(GastosContext);
}
