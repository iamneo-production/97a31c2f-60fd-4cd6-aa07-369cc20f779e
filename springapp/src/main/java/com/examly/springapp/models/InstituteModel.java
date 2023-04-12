package com.examly.springapp.models;
import java.lang.annotation.Inherited;

import javax.annotation.processing.Generated;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.*;

@Entity
@Table(name = "Institute")

public class InstituteModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer instituteId;
    private String instituteName;
    private String instituteDescription;
    private String instituteAddress;
    private String mobile;
    @Column(unique = true)
    private String email;
    public Integer getInstituteId() {
        return instituteId;
    }
    public void setInstituteId(Integer instituteId) {
        this.instituteId = instituteId;
    }
    public String getInstituteName() {
        return instituteName;
    }
    public void setInstituteName(String instituteName) {
        this.instituteName = instituteName;
    }
    public String getInstituteDescription() {
        return instituteDescription;
    }
    public void setInstituteDescription(String instituteDescription) {
        this.instituteDescription = instituteDescription;
    }
    public String getInstituteAddress() {
        return instituteAddress;
    }
    public void setInstituteAddress(String instituteAddress) {
        this.instituteAddress = instituteAddress;
    }
    public String getMobile() {
        return mobile;
    }
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public InstituteModel(Integer instituteId, String instituteName, String instituteDescription,
            String instituteAddress, String mobile, String email) {
        this.instituteId = instituteId;
        this.instituteName = instituteName;
        this.instituteDescription = instituteDescription;
        this.instituteAddress = instituteAddress;
        this.mobile = mobile;
        this.email = email;
    }
    
    public InstituteModel() {
    }



}
