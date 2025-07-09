import { useState } from "react";
import { useGastos } from "../context/GastosContext.jsx";

export default function Filtros() {
  const { gastos } = useGastos();
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  const filtered = gastos.filter(g => {
    const f = new Date(g.fecha);
    return (!desde || f >= new Date(desde)) && (!hasta || f <= new Date(hasta));
  });
  const total = filtered.reduce((s,g)=>s+g.monto,0);

  return (
    <div className="p-6 text-center">
      <h1 className="logo-text mb-4">Filtrar por Fecha</h1>
      <div className="input-group"><label>Desde</label><input type="date" value={desde} onChange={e=>setDesde(e.target.value)} /></div>
      <div className="input-group"><label>Hasta</label><input type="date" value={hasta} onChange={e=>setHasta(e.target.value)} /></div>
      <p className="mt-4 font-semibold">Total: {total.toFixed(2)} €</p>
    </div>
  );
}
