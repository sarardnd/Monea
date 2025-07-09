import { useGastos } from "../context/GastosContext.jsx";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Graficos() {
  const { gastos } = useGastos();
  const ahora = new Date();
  const gastosMes = gastos.filter(g => g.tipo === "gasto" && new Date(g.fecha).getMonth() === ahora.getMonth() && new Date(g.fecha).getFullYear() === ahora.getFullYear());
  const byCat = gastosMes.reduce((a, g) => { a[g.categoria] = (a[g.categoria]||0)+g.monto; return a; }, {});
  const data = Object.entries(byCat).map(([name,value])=>({name,value}));

  return (
    <div className="p-6 text-center">
      <h1 className="logo-text mb-4">Gastos por Categoría</h1>
      <PieChart width={400} height={300}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
          {data.map((_,i)=><Cell key={i} fill={["#5a9bd5","#82ca9d","#ffc658","#ff7f50","#a9a9a9"][i%5]} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
