import { useState, useEffect } from "react";

function App() {
  const [gastos, setGastos] = useState([]);
  const [nuevoGasto, setNuevoGasto] = useState({
    monto: "",
    categoria: "",
    comentario: "",
    fecha: "",
  });

  // Cargar datos guardados al iniciar
  useEffect(() => {
    const datosGuardados = localStorage.getItem("gastos");
    if (datosGuardados) {
      setGastos(JSON.parse(datosGuardados));
    }
  }, []);

  // Guardar cada vez que cambian
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevoGasto({ ...nuevoGasto, [name]: value });
  };

  const agregarGasto = (e) => {
    e.preventDefault();
    if (!nuevoGasto.monto || isNaN(nuevoGasto.monto)) return;

    const gastoConFecha = {
      id: Date.now(),
      monto: parseFloat(nuevoGasto.monto),
      categoria: nuevoGasto.categoria || "Sin categoría",
      comentario: nuevoGasto.comentario || "",
      fecha:
        nuevoGasto.fecha || new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    };

    setGastos([...gastos, gastoConFecha]);

    setNuevoGasto({
      monto: "",
      categoria: "",
      comentario: "",
      fecha: "",
    });
  };

  return (
  
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="logo-text">MONEA</h1>
      <p className="subtitle">Control de Gastos</p>

      <form onSubmit={agregarGasto} className="mb-6 space-y-2">
        <input
          type="number"
          name="monto"
          step="0.01"
          inputMode="decimal"
          placeholder="Cantidad (€)"
          value={nuevoGasto.monto}
          onChange={manejarCambio}
          required
          className="block w-full p-2 border rounded"
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={nuevoGasto.categoria}
          onChange={manejarCambio}
          className="block w-full p-2 border rounded"
        />
        <input
          type="text"
          name="comentario"
          placeholder="Comentario"
          value={nuevoGasto.comentario}
          onChange={manejarCambio}
          className="block w-full p-2 border rounded"
        />
        <input
          type="date"
          name="fecha"
          value={nuevoGasto.fecha}
          onChange={manejarCambio}
          className="block w-full p-2 border rounded"
        />
        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded">
          Añadir Gasto
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">📋 Lista de Gastos</h2>
      <ul className="space-y-2">
        {gastos.map((gasto) => (
          <li key={gasto.id} className="p-2 bg-white rounded shadow">
            <strong>{gasto.monto.toFixed(2)}€</strong> — {gasto.categoria} ({gasto.fecha})<br />
            <em>{gasto.comentario || "Sin comentario"}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
