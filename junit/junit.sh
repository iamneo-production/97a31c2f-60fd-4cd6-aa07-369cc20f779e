#!/bin/bash
if [ -d "/home/coder/project/workspace/springapp/" ]
then
    echo "project folder present"
    # checking for src folder
    if [ -d "/home/coder/project/workspace/springapp/src/" ]
    then
        cp -r /home/coder/project/workspace/junit/test /home/coder/project/workspace/springapp/src/;
		cd /home/coder/project/workspace/springapp/;
		mvn clean test;
    else
        echo "testGetCoursesAll FAILED";
        echo "testGetCoursesById FAILED";
        echo "testGetStudentAll FAILED";
        echo "testGetStudentById FAILED";
        echo "testGetInstituteById FAILED";
        echo "testGetAdmissionAll FAILED";
        echo "testGetInstituteAll FAILED";
        echo "testGetAdmissionById FAILED";
        echo "test_case1 FAILED";
        echo "test_case2 FAILED";
    fi
else
	echo "testGetCoursesAll FAILED";
        echo "testGetCoursesById FAILED";
        echo "testGetStudentAll FAILED";
        echo "testGetStudentById FAILED";
        echo "testGetInstituteById FAILED";
        echo "testGetAdmissionAll FAILED";
        echo "testGetInstituteAll FAILED";
        echo "testGetAdmissionById FAILED";
        echo "test_case1 FAILED";
        echo "test_case2 FAILED";
fi
