// src/db.js
import { get, set } from 'idb-keyval';

export async function guardarGastos(gastos) {
  await set('gastos', gastos);
}

export async function cargarGastos() {
  const gastos = await get('gastos');
  return gastos || [];
}
