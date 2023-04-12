package com.examly.springapp.models;
import javax.persistence.Table;
import javax.persistence.*;
import org.springframework.web.bind.annotation.DeleteMapping; 
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.PutMapping; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.repository.*;
import com.examly.springapp.service.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import java.util.*;
import javax.security.auth.spi.LoginModule;

@Entity
@Table(name = "Admission")
public class AdmissionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String studentName;
    private Date studentDOB;
    private String address;
    private String mobile;
    private Integer SSLC;
    private Integer HSC;
    private Integer Diploma;
    private String eligibility;
    private Integer courseId;
    private Integer instituteId;
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Integer getCourseId() {
        return courseId;
    }
    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }
    public Integer getInstituteId() {
        return instituteId;
    }
    public void setInstituteId(Integer instituteId) {
        this.instituteId = instituteId;
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

    public AdmissionModel(Integer id, String studentName, Date studentDOB, String address, String mobile, Integer sSLC,
            Integer hSC, Integer diploma, String eligibility, Integer courseId, Integer instituteId) {
        this.id = id;
        this.studentName = studentName;
        this.studentDOB = studentDOB;
        this.address = address;
        this.mobile = mobile;
        SSLC = sSLC;
        HSC = hSC;
        Diploma = diploma;
        this.eligibility = eligibility;
        this.courseId = courseId;
        this.instituteId = instituteId;
    }
    public AdmissionModel() {
    }
  
    
}