package com.examly.springapp.models;

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
    private String courseName;
    private String courseDescription;
    private Integer courseDuration;
    

    private String courseTiming;
    private Integer courseEnrolled;

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

    public String getCourseTiming() {
        return courseTiming;
    }

    public void setCourseTiming(String courseTiming) {
        this.courseTiming = courseTiming;
    }

    public Integer getCourseEnrolled() {
        return courseEnrolled;
    }

    public void setCourseEnrolled(Integer courseEnrolled) {
        this.courseEnrolled = courseEnrolled;
    }


    public CourseModel(Integer id, Integer courseId, String courseName, String courseDescription,
            Integer courseDuration, String courseTiming, Integer courseEnrolled) {
        this.id = id;
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseDescription = courseDescription;
        this.courseDuration = courseDuration;
        this.courseTiming = courseTiming;
        this.courseEnrolled = courseEnrolled;
    }

    public CourseModel() {
    }


}
