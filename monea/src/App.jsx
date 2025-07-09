import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGastos } from "./context/GastosContext.jsx";
import "./styles.css";

function App() {
  const { gastos, setGastos } = useGastos();
  const [tipo, setTipo] = useState("gasto");
  const [nuevo, setNuevo] = useState({ monto: "", categoria: "", comentario: "", fecha: "" });
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const agregarEntrada = (e) => {
    e.preventDefault();
    if (!nuevo.monto || isNaN(nuevo.monto)) return;

    const entrada = {
      id: Date.now(),
      tipo,
      monto: parseFloat(nuevo.monto),
      categoria: tipo === "gasto" ? (nuevo.categoria || "Sin categoría") : "",
      comentario: tipo === "gasto" ? nuevo.comentario || "" : "",
      // Guardamos la fecha como string plano YYYY-MM-DD
      fecha: nuevo.fecha || new Date().toISOString().slice(0, 10),
    };

    setGastos((prev) => [...prev, entrada]);
    setNuevo({ monto: "", categoria: "", comentario: "", fecha: "" });
  };

  const gastosDelMes = gastos.filter((g) => {
    const f = new Date(g.fecha + "T00:00:00"); // Evita desfase UTC
    const hoy = new Date();
    return f.getMonth() === hoy.getMonth() && f.getFullYear() === hoy.getFullYear();
  });

  const totalIngresos = gastosDelMes.filter((g) => g.tipo === "ingreso").reduce((s, g) => s + g.monto, 0);
  const totalGastos = gastosDelMes.filter((g) => g.tipo === "gasto").reduce((s, g) => s + g.monto, 0);
  const balance = totalIngresos - totalGastos;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f1e9] text-[#1b1b1b] px-4">
      <h1 className="logo-text mb-1">MONEA</h1>
      <p className="subtitle mb-6">control de gastos</p>

      <form onSubmit={agregarEntrada} className="formulario">
        <div className="tipo-selector">
          <button type="button" onClick={() => setTipo("gasto")} className={`tipo-boton ${tipo === "gasto" ? "activo" : ""}`}>Gasto</button>
          <button type="button" onClick={() => setTipo("ingreso")} className={`tipo-boton ${tipo === "ingreso" ? "activo" : ""}`}>Ingreso</button>
        </div>

        <div className="input-group">
          <label>Cantidad (€)</label>
          <input type="number" name="monto" value={nuevo.monto} onChange={manejarCambio} required />
        </div>

        {tipo === "gasto" && (
          <>
            <div className="input-group"><label>Categoría</label><input name="categoria" value={nuevo.categoria} onChange={manejarCambio} /></div>
            <div className="input-group"><label>Comentario</label><input name="comentario" value={nuevo.comentario} onChange={manejarCambio} /></div>
          </>
        )}

        <div className="input-group"><label>Fecha</label><input type="date" name="fecha" value={nuevo.fecha} onChange={manejarCambio} /></div>

        <button type="submit" className="boton-enviar">Añadir {tipo}</button>
      </form>

      <div className="bg-white rounded shadow mt-8 p-4 w-full max-w-md text-left">
        <h2 className="subtitle mb-4">balance mensual</h2>
        <p><strong>Ingresos:</strong> {totalIngresos.toFixed(2)} €</p>
        <p><strong>Gastos:</strong> {totalGastos.toFixed(2)} €</p>
        <p><strong>Balance:</strong> <span className={balance >= 0 ? "text-green-600" : "text-red-600"}>{balance.toFixed(2)} €</span></p>

        <div className="mt-4">
          <button onClick={() => navigate("/monea-plus")} className="boton-enviar">MONEA+</button>
        </div>
      </div>
    </div>
  );
}

export default App;
