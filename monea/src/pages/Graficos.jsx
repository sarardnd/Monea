import { useGastos } from "../context/GastosContext.jsx";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useState } from "react";

const COLORS = ["#5a9bd5", "#82ca9d", "#ffc658", "#ff7f50", "#a9a9a9", "#8884d8", "#d0ed57"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export default function Graficos() {
  const { gastos } = useGastos();
  const hoy = new Date();

  const [mesSeleccionado, setMesSeleccionado] = useState(hoy.getMonth());
  const [anioSeleccionado, setAnioSeleccionado] = useState(hoy.getFullYear());

  // Filtrar gastos del mes/año seleccionado
  const gastosFiltrados = gastos.filter((g) => {
    const fecha = new Date(g.fecha + "T00:00:00"); // <- Corregido
    return (
      g.tipo === "gasto" &&
      fecha.getMonth() === Number(mesSeleccionado) &&
      fecha.getFullYear() === Number(anioSeleccionado)
    );
  });

  // Agrupar por categoría
  const byCategoria = gastosFiltrados.reduce((acc, g) => {
    acc[g.categoria] = (acc[g.categoria] || 0) + g.monto;
    return acc;
  }, {});

  const data = Object.entries(byCategoria).map(([name, value]) => ({ name, value }));

  // Obtener años disponibles desde los datos
  const aniosDisponibles = [...new Set(gastos.map(g => new Date(g.fecha + "T00:00:00").getFullYear()))];

  return (
    <div className="p-6 text-center">
      <h1 className="logo-text mb-4">Gastos por Categoría</h1>

      <div className="flex justify-center gap-4 mb-4">
        <select value={mesSeleccionado} onChange={(e) => setMesSeleccionado(e.target.value)} className="border px-2 py-1">
          {MONTHS.map((mes, i) => (
            <option key={i} value={i}>{mes}</option>
          ))}
        </select>
        <select value={anioSeleccionado} onChange={(e) => setAnioSeleccionado(e.target.value)} className="border px-2 py-1">
          {aniosDisponibles.map((a, i) => (
            <option key={i} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {data.length === 0 ? (
        <p>No hay gastos para este mes.</p>
      ) : (
        <PieChart width={400} height={300}>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
}
