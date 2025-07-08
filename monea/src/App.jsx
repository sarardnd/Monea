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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f1e9] text-[#1b1b1b] px-4">
      <h1 className="logo-text mb-1">MONEA</h1>
      <p className="subtitle mb-6">control de gastos</p>

      <form onSubmit={agregarEntrada} className="formulario">
        {/* Botones de tipo */}
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

        {/* Campo común */}
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

        {/* Solo si es gasto */}
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
    </div>
  );
}

export default App;
