package com.ems.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Name is required")
    @Pattern(regexp = "^[A-Za-z][A-Za-z .'-]{1,99}$",
             message = "Name must be 2-100 characters (letters, spaces, . ' - only)")
    @Column(nullable = false, length = 100)
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")
    @Size(max = 100, message = "Email is too long")
    @Column(nullable = false, length = 100, unique = true)
    private String email;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be exactly 10 digits")
    @Column(nullable = false, length = 15)
    private String phone;

    @NotBlank(message = "Department is required")
    @Size(max = 50, message = "Department is too long")
    @Column(nullable = false, length = 50)
    private String department;

    @NotBlank(message = "Designation is required")
    @Size(max = 50, message = "Designation is too long")
    @Column(nullable = false, length = 50)
    private String designation;

    @NotNull(message = "Salary is required")
    @DecimalMin(value = "0.01", message = "Salary must be greater than 0")
    @Digits(integer = 8, fraction = 2, message = "Salary: max 8 digits and 2 decimals")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal salary;

    @NotNull(message = "Joining date is required")
    @PastOrPresent(message = "Joining date cannot be in the future")
    @Column(name = "joining_date", nullable = false)
    private LocalDate joiningDate;

    public Employee() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
    public BigDecimal getSalary() { return salary; }
    public void setSalary(BigDecimal salary) { this.salary = salary; }
    public LocalDate getJoiningDate() { return joiningDate; }
    public void setJoiningDate(LocalDate joiningDate) { this.joiningDate = joiningDate; }
}
