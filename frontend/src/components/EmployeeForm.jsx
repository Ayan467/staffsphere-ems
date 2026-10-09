import { useState } from 'react';

const EMPTY = {
  name: '', email: '', phone: '', department: '',
  designation: '', salary: '', joiningDate: '',
};

// Same rules as the Spring Boot backend
function validate(v) {
  const e = {};
  if (!/^[A-Za-z][A-Za-z .'-]{1,99}$/.test(v.name.trim()))
    e.name = "Name must be 2-100 characters (letters, spaces, . ' - only)";
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v.email.trim()))
    e.email = 'Enter a valid email address';
  if (!/^[0-9]{10}$/.test(v.phone.trim())) e.phone = 'Phone must be exactly 10 digits';
  if (!v.department.trim()) e.department = 'Department is required';
  if (!v.designation.trim()) e.designation = 'Designation is required';
  if (!/^\d{1,8}(\.\d{1,2})?$/.test(String(v.salary)) || Number(v.salary) <= 0)
    e.salary = 'Salary must be greater than 0 (max 2 decimals)';
  if (!v.joiningDate) e.joiningDate = 'Joining date is required';
  else if (v.joiningDate > new Date().toISOString().slice(0, 10))
    e.joiningDate = 'Joining date cannot be in the future';
  return e;
}

export default function EmployeeForm({ initial, onSubmit, onCancel, serverErrors, saving }) {
  const [values, setValues] = useState(initial ? { ...EMPTY, ...initial } : EMPTY);
  const [errors, setErrors] = useState({});
  const shown = { ...errors, ...serverErrors };

  const change = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    onSubmit({
      ...values,
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim(),
      department: values.department.trim(),
      designation: values.designation.trim(),
      salary: Number(values.salary),
    });
  };

  const field = (name, label, type = 'text', extra = {}) => (
    <div className="col-md-6 col-lg-4">
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        id={name} name={name} type={type} value={values[name]} onChange={change}
        className={`form-control ${shown[name] ? 'is-invalid' : ''}`} {...extra}
      />
      <div className="invalid-feedback">{shown[name]}</div>
    </div>
  );

  return (
    <form onSubmit={submit} noValidate>
      <div className="row g-3">
        {field('name', 'Full name')}
        {field('email', 'Email', 'email')}
        {field('phone', 'Phone (10 digits)', 'tel', { maxLength: 10 })}
        {field('department', 'Department')}
        {field('designation', 'Designation')}
        {field('salary', 'Salary (₹)', 'number', { step: '0.01', min: '0' })}
        {field('joiningDate', 'Joining date', 'date', { max: new Date().toISOString().slice(0, 10) })}
      </div>
      <div className="mt-4 d-flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : initial ? 'Update employee' : 'Add employee'}
        </button>
        {initial && (
          <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
