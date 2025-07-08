import { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [gastos, setGastos] = useState([]);
  const [tipo, setTipo] = useState("gasto"); // gasto o ingreso
  const [nuevo, setNuevo] = useState({
    monto: "",
    categoria: "",
    comentario: "",
    fecha: "",
  });

  useEffect(() => {
    const datosGuardados = localStorage.getItem("gastos");
    if (datosGuardados) {
      setGastos(JSON.parse(datosGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevo({ ...nuevo, [name]: value });
  };

  const agregarEntrada = (e) => {
    e.preventDefault();
    if (!nuevo.monto || isNaN(nuevo.monto)) return;

    const entrada = {
      id: Date.now(),
      tipo, // "gasto" o "ingreso"
      monto: parseFloat(nuevo.monto),
      categoria: tipo === "gasto" ? nuevo.categoria || "Sin categoría" : "",
      comentario: tipo === "gasto" ? nuevo.comentario || "" : "",
      fecha: nuevo.fecha || new Date().toISOString().slice(0, 10),
    };

    setGastos([...gastos, entrada]);

    setNuevo({
      monto: "",
      categoria: "",
      comentario: "",
      fecha: "",
    });
  };

  // 🧮 Dashboard: cálculos del mes actual
  const gastosDelMes = gastos.filter((g) => {
    const fecha = new Date(g.fecha);
    const ahora = new Date();
    return (
      fecha.getMonth() === ahora.getMonth() &&
      fecha.getFullYear() === ahora.getFullYear()
    );
  });

  const totalIngresos = gastosDelMes
    .filter((g) => g.tipo === "ingreso")
    .reduce((sum, g) => sum + g.monto, 0);

  const totalGastos = gastosDelMes
    .filter((g) => g.tipo === "gasto")
    .reduce((sum, g) => sum + g.monto, 0);

  const balance = totalIngresos - totalGastos;

  const gastosPorCategoria = {};
  gastosDelMes
    .filter((g) => g.tipo === "gasto")
    .forEach((g) => {
      gastosPorCategoria[g.categoria] =
        (gastosPorCategoria[g.categoria] || 0) + g.monto;
    });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f1e9] text-[#1b1b1b] px-4">
      <h1 className="logo-text mb-1">MONEA</h1>
      <p className="subtitle mb-6">control de gastos</p>

      {/* FORMULARIO */}
      <form onSubmit={agregarEntrada} className="formulario">
        <div className="tipo-selector">
          <button
            type="button"
            onClick={() => setTipo("gasto")}
            className={`tipo-boton ${tipo === "gasto" ? "activo" : ""}`}
          >
            Gasto
          </button>
          <button
            type="button"
            onClick={() => setTipo("ingreso")}
            className={`tipo-boton ${tipo === "ingreso" ? "activo" : ""}`}
          >
            Ingreso
          </button>
        </div>

        <div className="input-group">
          <label htmlFor="monto">Cantidad (€)</label>
          <input
            type="number"
            name="monto"
            value={nuevo.monto}
            onChange={manejarCambio}
            required
          />
        </div>

        {tipo === "gasto" && (
          <>
            <div className="input-group">
              <label htmlFor="categoria">Categoría</label>
              <input
                type="text"
                name="categoria"
                value={nuevo.categoria}
                onChange={manejarCambio}
              />
            </div>

            <div className="input-group">
              <label htmlFor="comentario">Comentario</label>
              <input
                type="text"
                name="comentario"
                value={nuevo.comentario}
                onChange={manejarCambio}
              />
            </div>
          </>
        )}

        <div className="input-group">
          <label htmlFor="fecha">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={nuevo.fecha}
            onChange={manejarCambio}
          />
        </div>

        <button type="submit" className="boton-enviar">
          Añadir {tipo}
        </button>
      </form>

      {/* DASHBOARD */}
      <div className="bg-white rounded shadow mt-8 p-4 w-full max-w-md text-left">
        <h2 className="subtitle mb-4">balance mensual</h2>
        <p><strong>Ingresos:</strong> {totalIngresos.toFixed(2)} €</p>
        <p><strong>Gastos:</strong> {totalGastos.toFixed(2)} €</p>
        <p>
          <strong>Balance:</strong>{" "}
          <span
            className={balance >= 0 ? "text-green-600" : "text-red-600"}
          >
            {balance.toFixed(2)} €
          </span>
        </p>
      </div>
    </div>
  );
}

export default App;
