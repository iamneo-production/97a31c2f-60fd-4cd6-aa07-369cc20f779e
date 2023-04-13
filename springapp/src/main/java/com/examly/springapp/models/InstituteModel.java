package com.examly.springapp.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
    
}
