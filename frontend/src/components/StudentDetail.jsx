export default function StudentDetail({ student, onClose }) {
  const fmt = (d) => new Date(d).toLocaleString();
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{student.name}</h2>
        <dl>
          <dt>Email</dt><dd>{student.email}</dd>
          <dt>Age</dt><dd>{student.age}</dd>
          <dt>Course</dt><dd>{student.course}</dd>
          <dt>ID</dt><dd className="mono">{student._id}</dd>
          <dt>Added</dt><dd>{fmt(student.createdAt)}</dd>
          <dt>Last updated</dt><dd>{fmt(student.updatedAt)}</dd>
        </dl>
        <button className="btn primary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
