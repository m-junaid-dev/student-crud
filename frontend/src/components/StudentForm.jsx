import { useState } from "react";

const empty = { name: "", email: "", age: "", course: "" };

export default function StudentForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    initial
      ? { name: initial.name, email: initial.email, age: initial.age, course: initial.course }
      : empty
  );
  const [saving, setSaving] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const ok = await onSave({ ...form, age: Number(form.age) });
    setSaving(false);
    if (ok && !initial) setForm(empty);
  };

  return (
    <form onSubmit={submit} className="form">
      <label>Full name
        <input name="name" value={form.name} onChange={change} required />
      </label>
      <label>Email
        <input name="email" type="email" value={form.email} onChange={change} required />
      </label>
      <label>Age
        <input name="age" type="number" min="5" max="100" value={form.age} onChange={change} required />
      </label>
      <label>Course
        <input name="course" value={form.course} onChange={change} required />
      </label>
      <div className="row">
        <button className="btn primary" disabled={saving}>
          {saving ? "Saving…" : initial ? "Save changes" : "Add student"}
        </button>
        {initial && (
          <button type="button" className="btn" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}
