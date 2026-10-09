package com.ems.exception;

public class EmployeeNotFoundException extends RuntimeException {
    public EmployeeNotFoundException(Integer id) {
        super("Employee with id " + id + " not found");
    }
}
