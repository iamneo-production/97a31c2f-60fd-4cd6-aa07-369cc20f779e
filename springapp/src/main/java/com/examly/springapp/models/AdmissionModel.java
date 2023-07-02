package com.examly.springapp.models;
import javax.persistence.Table;
import javax.persistence.*;
import java.util.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Admission")
public class AdmissionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer courseId;
    private Integer studentIdNumber;
    private String firstName;
    private String lastName;
    private String fatherName;
    private String motherName;
    private String phoneNumber1;
    private String phoneNumber2;
    private String emailId;
    private Date  studentDOB;
    private String houseNumber;
    private String streetName;
    private String areaName;
    private String state;
    private Integer pincode;
    private String nationality;
    private Integer sslc;
    private Integer hsc;
    private Integer diploma;
    private String status;
    
}