package com.ems.repository;

import com.ems.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Integer id);

    @Query("""
           SELECT e FROM Employee e
           WHERE LOWER(e.name)        LIKE LOWER(CONCAT('%', :q, '%'))
              OR LOWER(e.email)       LIKE LOWER(CONCAT('%', :q, '%'))
              OR LOWER(e.department)  LIKE LOWER(CONCAT('%', :q, '%'))
              OR LOWER(e.designation) LIKE LOWER(CONCAT('%', :q, '%'))
           ORDER BY e.id
           """)
    List<Employee> search(@Param("q") String q);
}
