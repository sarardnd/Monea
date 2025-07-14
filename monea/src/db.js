// src/db.js
import { get, set } from "idb-keyval";

export async function guardarGastosEnDB(gastos) {
  await set("gastos", gastos);
}

export async function cargarGastosDesdeDB() {
  const datos = await get("gastos");
  return datos || [];
}
