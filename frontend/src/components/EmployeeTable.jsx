const inr = (n) => Number(n).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return <p className="text-center text-muted my-4">No employees found.</p>;
  }
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th>
            <th>Department</th><th>Designation</th><th className="text-end">Salary</th>
            <th>Joined</th><th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td className="fw-semibold">{e.name}</td>
              <td>{e.email}</td>
              <td>{e.phone}</td>
              <td><span className="badge text-bg-secondary">{e.department}</span></td>
              <td>{e.designation}</td>
              <td className="text-end">{inr(e.salary)}</td>
              <td>{e.joiningDate}</td>
              <td className="text-end text-nowrap">
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(e)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(e)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
