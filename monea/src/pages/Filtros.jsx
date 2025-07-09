import { useGastos } from "../context/GastosContext.jsx";
import { useState } from "react";

export default function Filtros() {
  const { gastos } = useGastos();
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  const filtrarPorFecha = (fecha) => {
    const fechaObj = new Date(fecha + "T00:00:00"); // <- Corregido
    const desdeObj = desde ? new Date(desde + "T00:00:00") : null; // <- Corregido
    const hastaObj = hasta ? new Date(hasta + "T00:00:00") : null; // <- Corregido

    return (
      (!desdeObj || fechaObj >= desdeObj) &&
      (!hastaObj || fechaObj <= hastaObj)
    );
  };

  const resultados = gastos
    .filter((g) => filtrarPorFecha(g.fecha))
    .sort((a, b) => new Date(b.fecha + "T00:00:00") - new Date(a.fecha + "T00:00:00")); // <- Corregido

  const totalIngresos = resultados
    .filter((g) => g.tipo === "ingreso")
    .reduce((sum, g) => sum + g.monto, 0);

  const totalGastos = resultados
    .filter((g) => g.tipo === "gasto")
    .reduce((sum, g) => sum + g.monto, 0);

  const fmt = (f) => {
    const d = new Date(f + "T00:00:00"); // <- Corregido
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
  };

  return (
    <div className="p-6 overflow-x-auto">
      <h1 className="logo-text mb-4">Filtrar por fecha</h1>

      <div className="flex gap-4 mb-4">
        <div>
          <label>Desde:</label>
          <input
            type="date"
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
            className="border px-2 py-1"
          />
        </div>
        <div>
          <label>Hasta:</label>
          <input
            type="date"
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
            className="border px-2 py-1"
          />
        </div>
      </div>

      <table className="w-full max-w-3xl mx-auto border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Monto (€)</th>
            <th className="p-2 border">Comentario</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((g) => (
            <tr key={g.id}>
              <td className="p-2 border">{fmt(g.fecha)}</td>
              <td className="p-2 border">{g.tipo}</td>
              <td className="p-2 border">{g.monto.toFixed(2)}</td>
              <td className="p-2 border">{g.comentario || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 text-center font-bold">
        <p>Total ingresos: {totalIngresos.toFixed(2)} €</p>
        <p>Total gastos: {totalGastos.toFixed(2)} €</p>
      </div>
    </div>
  );
}
