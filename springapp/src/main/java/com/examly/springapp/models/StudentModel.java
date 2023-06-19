
package com.examly.springapp.models;
import java.lang.annotation.Inherited;
import java.sql.Date;
import javax.annotation.processing.Generated;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Student")

public class StudentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studentId;
    private String firstName;
    private String lastName;
    private String fatherName;
    private String motherName;
    private String phoneNumber1;
    private String phoneNumber2;
    private String emailId;
    private Date studentDOB;
    private String houseNumber;
    private String streetName;
    private String areaName;
    private String state;
    private Integer pincode;
    private String nationality;
    private Integer sslc;
    private Integer hsc;
    private Integer diploma;
    private String eligibility;  
    private String courseId;  
    private String instituteId;
}
