import { createContext, useState, useEffect, useContext } from "react";

const GastosContext = createContext();

export function GastosProvider({ children }) {
  const [gastos, setGastos] = useState(() => {
    try {
      const data = localStorage.getItem("gastos");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error al leer de localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("gastos", JSON.stringify(gastos));
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
