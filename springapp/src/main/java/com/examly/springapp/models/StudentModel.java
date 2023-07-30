package com.examly.springapp.models;

import java.sql.Date;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.*;

import lombok.AllArgsConstructor;

@Entity
@AllArgsConstructor
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

    public Integer getStudentId() {
        return studentId;
    }
    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getFatherName() {
        return fatherName;
    }
    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }
    public String getMotherName() {
        return motherName;
    }
    public void setMotherName(String motherName) {
        this.motherName = motherName;
    }
    public String getPhoneNumber1() {
        return phoneNumber1;
    }
    public void setPhoneNumber1(String phoneNumber1) {
        this.phoneNumber1 = phoneNumber1;
    }
    public String getPhoneNumber2() {
        return phoneNumber2;
    }
    public void setPhoneNumber2(String phoneNumber2) {
        this.phoneNumber2 = phoneNumber2;
    }
    public String getEmailId() {
        return emailId;
    }
    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }
    public Date getStudentDOB() {
        return studentDOB;
    }
    public void setStudentDOB(Date studentDOB) {
        this.studentDOB = studentDOB;
    }
    public String getHouseNumber() {
        return houseNumber;
    }
    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }
    public String getStreetName() {
        return streetName;
    }
    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }
    public String getAreaName() {
        return areaName;
    }
    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    public Integer getPincode() {
        return pincode;
    }
    public void setPincode(Integer pincode) {
        this.pincode = pincode;
    }
    public String getNationality() {
        return nationality;
    }
    public void setNationality(String nationality) {
        this.nationality = nationality;
    }
    public Integer getSslc() {
        return sslc;
    }
    public void setSslc(Integer sslc) {
        this.sslc = sslc;
    }
    public Integer getHsc() {
        return hsc;
    }
    public void setHsc(Integer hsc) {
        this.hsc = hsc;
    }
    public Integer getDiploma() {
        return diploma;
    }
    public void setDiploma(Integer diploma) {
        this.diploma = diploma;
    }
    public String getEligibility() {
        return eligibility;
    }
    public void setEligibility(String eligibility) {
        this.eligibility = eligibility;
    }
    public String getCourseId() {
        return courseId;
    }
    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }
    public String getInstituteId() {
        return instituteId;
    }
    public void setInstituteId(String instituteId) {
        this.instituteId = instituteId;
    }

    public StudentModel() {
        // default constructor student model no impl
    }

}
