import { useCallback, useEffect, useState } from 'react';
import EmployeeForm from './components/EmployeeForm.jsx';
import EmployeeTable from './components/EmployeeTable.jsx';
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from './api.js';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);
  const [serverErrors, setServerErrors] = useState({});
  const [alert, setAlert] = useState(null);       // { type, text }
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (q) => {
    try {
      setEmployees(await getEmployees(q));
    } catch {
      setAlert({ type: 'danger', text: 'Cannot reach the server. Is the backend running on port 8080?' });
    } finally {
      setLoading(false);
    }
  }, []);

  // search with a small delay so we don't call the API on every keystroke
  useEffect(() => {
    const t = setTimeout(() => load(search), 300);
    return () => clearTimeout(t);
  }, [search, load]);

  const handleSubmit = async (data) => {
    setSaving(true);
    setServerErrors({});
    try {
      if (editing) {
        await updateEmployee(editing.id, data);
        setAlert({ type: 'success', text: 'Employee updated.' });
      } else {
        await createEmployee(data);
        setAlert({ type: 'success', text: 'Employee added.' });
      }
      setEditing(null);
      await load(search);
    } catch (err) {
      const res = err.response?.data;
      setServerErrors(res?.errors || {});
      setAlert({ type: 'danger', text: res?.message || 'Something went wrong.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (emp) => {
    if (!window.confirm(`Delete ${emp.name}? This cannot be undone.`)) return;
    try {
      await deleteEmployee(emp.id);
      if (editing?.id === emp.id) setEditing(null);
      setAlert({ type: 'success', text: 'Employee deleted.' });
      await load(search);
    } catch (err) {
      setAlert({ type: 'danger', text: err.response?.data?.message || 'Delete failed.' });
    }
  };

  const startEdit = (emp) => {
    setServerErrors({});
    setEditing(emp);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="navbar ems-navbar mb-4">
        <div className="container">
          <span className="navbar-brand text-white fw-semibold">Employee Management System</span>
        </div>
      </nav>

      <main className="container pb-5">
        {alert && (
          <div className={`alert alert-${alert.type} alert-dismissible`} role="alert">
            {alert.text}
            <button type="button" className="btn-close" onClick={() => setAlert(null)} aria-label="Close" />
          </div>
        )}

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">{editing ? `Edit employee #${editing.id}` : 'Add new employee'}</h5>
            <EmployeeForm
              key={editing ? editing.id : 'new'}
              initial={editing}
              onSubmit={handleSubmit}
              onCancel={() => { setEditing(null); setServerErrors({}); }}
              serverErrors={serverErrors}
              saving={saving}
            />
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
              <h5 className="mb-0">Employees <span className="text-muted fs-6">({employees.length})</span></h5>
              <input
                type="search" className="form-control" style={{ maxWidth: 320 }}
                placeholder="Search name, email, department..."
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {loading
              ? <div className="text-center my-4"><div className="spinner-border" role="status" /></div>
              : <EmployeeTable employees={employees} onEdit={startEdit} onDelete={handleDelete} />}
          </div>
        </div>
      </main>
    </>
  );
}
