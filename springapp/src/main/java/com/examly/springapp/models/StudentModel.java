
package com.examly.springapp.models;
import java.lang.annotation.Inherited;
import java.sql.Date;
import javax.annotation.processing.Generated;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.*;

@Entity
@Table(name = "Student")

public class StudentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studentId;
    private String studentName;
    private Date studentDOB;
    private String address;
    private String mobile;
    private Integer SSLC;
    private Integer HSC;
    private Integer Diploma;
    private String eligibility;
    public Integer getStudentId() {
        return studentId;
    }
    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }
    public String getStudentName() {
        return studentName;
    }
    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
    public Date getStudentDOB() {
        return studentDOB;
    }
    public void setStudentDOB(Date studentDOB) {
        this.studentDOB = studentDOB;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getMobile() {
        return mobile;
    }
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
    public Integer getSSLC() {
        return SSLC;
    }
    public void setSSLC(Integer sSLC) {
        SSLC = sSLC;
    }
    public Integer getHSC() {
        return HSC;
    }
    public void setHSC(Integer hSC) {
        HSC = hSC;
    }
    public Integer getDiploma() {
        return Diploma;
    }
    public void setDiploma(Integer diploma) {
        Diploma = diploma;
    }
    public String getEligibility() {
        return eligibility;
    }
    public void setEligibility(String eligibility) {
        this.eligibility = eligibility;
    }
    public StudentModel(Integer studentId, String studentName, Date studentDOB, String address, String mobile,
            Integer sSLC, Integer hSC, Integer diploma, String eligibility) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentDOB = studentDOB;
        this.address = address;
        this.mobile = mobile;
        SSLC = sSLC;
        HSC = hSC;
        Diploma = diploma;
        this.eligibility = eligibility;
    }
    public StudentModel() {
    }
    
}
