import { useEffect, useState } from "react";
import * as api from "./api";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import StudentDetail from "./components/StudentDetail";

export default function App() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);   // student being edited
  const [viewing, setViewing] = useState(null);   // student shown in detail panel
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const notify = (text, type = "ok") => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 2800);
  };

  // READ ALL
  const load = async () => {
    try {
      const res = await api.getStudents();
      setStudents(res.data);
    } catch (e) {
      notify(e.message, "err");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // CREATE or UPDATE
  const handleSave = async (data) => {
    try {
      if (editing) {
        await api.updateStudent(editing._id, data);
        notify("Student updated");
        setEditing(null);
      } else {
        await api.createStudent(data);
        notify("Student added");
      }
      await load();
      return true;
    } catch (e) {
      notify(e.message, "err");
      return false;
    }
  };

  // DELETE
  const handleDelete = async (s) => {
    if (!window.confirm(`Delete ${s.name}?`)) return;
    try {
      await api.deleteStudent(s._id);
      notify("Student deleted");
      if (viewing?._id === s._id) setViewing(null);
      if (editing?._id === s._id) setEditing(null);
      await load();
    } catch (e) {
      notify(e.message, "err");
    }
  };

  // READ ONE (fetched from the API by id)
  const handleView = async (s) => {
    try {
      const res = await api.getStudent(s._id);
      setViewing(res.data);
    } catch (e) {
      notify(e.message, "err");
    }
  };

  return (
    <div className="page">
      <header className="top">
        <h1>Student Records</h1>
        <p>{students.length} {students.length === 1 ? "student" : "students"} enrolled</p>
      </header>

      <main className="layout">
        <section className="panel">
          <h2>{editing ? "Edit student" : "Add student"}</h2>
          <StudentForm
            key={editing?._id || "new"}
            initial={editing}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        </section>

        <section className="panel wide">
          <h2>All students</h2>
          {loading ? (
            <p className="muted">Loading…</p>
          ) : (
            <StudentTable
              students={students}
              onView={handleView}
              onEdit={(s) => { setEditing(s); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>

      {viewing && <StudentDetail student={viewing} onClose={() => setViewing(null)} />}
      {toast && <div className={`toast ${toast.type}`}>{toast.text}</div>}
    </div>
  );
}
