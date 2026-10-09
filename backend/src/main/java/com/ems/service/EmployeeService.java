package com.ems.service;

import com.ems.exception.DuplicateEmailException;
import com.ems.exception.EmployeeNotFoundException;
import com.ems.model.Employee;
import com.ems.repository.EmployeeRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EmployeeService {

    private final EmployeeRepository repo;

    public EmployeeService(EmployeeRepository repo) {
        this.repo = repo;
    }

    @Transactional(readOnly = true)
    public List<Employee> list(String search) {
        if (search == null || search.isBlank()) {
            return repo.findAll(Sort.by("id"));
        }
        return repo.search(search.trim());
    }

    @Transactional(readOnly = true)
    public Employee get(Integer id) {
        return repo.findById(id).orElseThrow(() -> new EmployeeNotFoundException(id));
    }

    public Employee create(Employee e) {
        normalize(e);
        e.setId(null);
        if (repo.existsByEmail(e.getEmail())) throw new DuplicateEmailException(e.getEmail());
        try {
            return repo.saveAndFlush(e);
        } catch (DataIntegrityViolationException ex) {   // safety net: DB UNIQUE constraint
            throw new DuplicateEmailException(e.getEmail());
        }
    }

    public Employee update(Integer id, Employee in) {
        Employee existing = get(id);
        normalize(in);
        if (repo.existsByEmailAndIdNot(in.getEmail(), id)) throw new DuplicateEmailException(in.getEmail());

        existing.setName(in.getName());
        existing.setEmail(in.getEmail());
        existing.setPhone(in.getPhone());
        existing.setDepartment(in.getDepartment());
        existing.setDesignation(in.getDesignation());
        existing.setSalary(in.getSalary());
        existing.setJoiningDate(in.getJoiningDate());
        try {
            return repo.saveAndFlush(existing);
        } catch (DataIntegrityViolationException ex) {
            throw new DuplicateEmailException(in.getEmail());
        }
    }

    public void delete(Integer id) {
        repo.delete(get(id));
    }

    private void normalize(Employee e) {
        if (e.getName() != null) e.setName(e.getName().trim());
        if (e.getEmail() != null) e.setEmail(e.getEmail().trim().toLowerCase());
        if (e.getPhone() != null) e.setPhone(e.getPhone().trim());
        if (e.getDepartment() != null) e.setDepartment(e.getDepartment().trim());
        if (e.getDesignation() != null) e.setDesignation(e.getDesignation().trim());
    }
}
