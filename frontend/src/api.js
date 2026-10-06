// All backend calls live here. "/api" is proxied to http://localhost:5000 by Vite.
const BASE = "/api/students";

async function request(url, options) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Something went wrong");
  return json;
}

export const getStudents = () => request(BASE);
export const getStudent = (id) => request(`${BASE}/${id}`);
export const createStudent = (data) =>
  request(BASE, { method: "POST", body: JSON.stringify(data) });
export const updateStudent = (id, data) =>
  request(`${BASE}/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteStudent = (id) => request(`${BASE}/${id}`, { method: "DELETE" });
