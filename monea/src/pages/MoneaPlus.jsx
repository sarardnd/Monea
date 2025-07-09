import { useNavigate } from "react-router-dom";
export default function MoneaPlus() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f1e9] text-[#1b1b1b] px-4">
      <h1 className="logo-text mb-2">MONEA+</h1>
      <p className="subtitle mb-6">análisis y datos</p>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button className="boton-enviar" onClick={() => nav("/monea-plus/graficos")}>📊 Gráficos</button>
        <button className="boton-enviar" onClick={() => nav("/monea-plus/filtros")}>🔎 Filtros</button>
        <button className="boton-enviar" onClick={() => nav("/monea-plus/todo")}>📋 Todo</button>
        <button className="mt-4 text-sm underline" onClick={() => nav("/")}>← Volver</button>
      </div>
    </div>
  );
}
