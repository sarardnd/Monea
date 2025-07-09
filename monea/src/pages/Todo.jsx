import { useGastos } from "../context/GastosContext.jsx";

export default function Todo() {
  const { gastos } = useGastos();

  const fmt = (isoDateStr) => {
    const d = new Date(isoDateStr + "T00:00:00"); // Asegura local correcto
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
  };

  const soloGastos = gastos
    .filter(g => g.tipo === "gasto")
    .sort((a, b) => new Date(b.fecha + "T00:00:00") - new Date(a.fecha + "T00:00:00"));

  return (
    <div className="p-6 overflow-x-auto">
      <h1 className="logo-text mb-4">Todos los gastos</h1>
      <table className="w-full max-w-3xl mx-auto border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border">Día</th>
            <th className="p-2 border">Cantidad (€)</th>
            <th className="p-2 border">Comentario</th>
          </tr>
        </thead>
        <tbody>
          {soloGastos.map(g => (
            <tr key={g.id}>
              <td className="p-2 border">{fmt(g.fecha)}</td>
              <td className="p-2 border">{g.monto.toFixed(2)}</td>
              <td className="p-2 border">{g.comentario || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
