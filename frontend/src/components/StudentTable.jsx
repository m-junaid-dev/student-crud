export default function StudentTable({ students, onView, onEdit, onDelete }) {
  if (students.length === 0) {
    return <p className="muted">No students yet. Add the first one using the form.</p>;
  }
  return (
    <div className="scroll">
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Age</th><th>Course</th><th></th></tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.age}</td>
              <td>{s.course}</td>
              <td className="actions">
                <button className="btn sm" onClick={() => onView(s)}>View</button>
                <button className="btn sm" onClick={() => onEdit(s)}>Edit</button>
                <button className="btn sm danger" onClick={() => onDelete(s)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
