package com.examly.springapp.models;

import java.lang.annotation.Inherited;

import javax.annotation.processing.Generated;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.*;

@Entity
@Table(name = "Course")

public class CourseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer courseId;
    private String courseName ;
    private String courseDescription ;
    private  Integer courseDuration ;
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
    public String getCourseName() {
        return courseName;
    }
    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
    public String getCourseDescription() {
        return courseDescription;
    }
    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }
    public Integer getCourseDuration() {
        return courseDuration;
    }
    public void setCourseDuration(Integer courseDuration) {
        this.courseDuration = courseDuration;
    }
    public CourseModel(Integer courseId, String courseName, String courseDescription, Integer courseDuration) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseDescription = courseDescription;
        this.courseDuration = courseDuration;
    }
    public CourseModel() {
    }
    


}
