import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Signup from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
<<<<<<< HEAD
import InstitutePage from './pages/Admin/InstitutePages/InstitutePage';
import AddInstitute from './pages/Admin/InstitutePages/AddInstitute';
import EditInstitute from './pages/Admin/InstitutePages/EditInstitute';
import StudentPage from './pages/Admin/StudentPages/StudentPage';
import AddStudent from './pages/Admin/StudentPages/AddStudent';
import EditStudent from './pages/Admin/StudentPages/EditStudent';
import UserInstitutePage from './pages/User/UserInstitutePage';
import UserCoursePage from './pages/User/UserCoursePage';
import CourseApplyForm from './pages/User/Course/CourseApplyForm';
import AddCourse from './pages/Admin/CoursePages/AddCourse';
import CoursePage from './pages/Admin/CoursePages/CoursePage';
import EditCourse from './pages/Admin/CoursePages/EditCourse';
import EnrolledCoursePage from './pages/User/EnrolledCoursePage';
import UserLandingPage from './pages/User/UserLandingPage';
import LandingPage from './pages/Admin/LandingPage';
import UserFeedbackPage from './pages/User/UserFeedbackPage';
import CourseAppliedView from './pages/User/Course/CourseAppliedView';
import CourseApplyEdit from './pages/User/Course/CourseApplyEdit';
import AdminReviewPage from './pages/Admin/AdminReviewPage';
import { ApproveUser } from './components/Admin/ApproveUser/ApproveUser';
=======
import AdminHomePage from './components/Admin/AdminHomePage/AdminHomePage';
import Homepage from './components/User/Homepage/Homepage';
// import './App.css';
import Course from "./components/Admin/Course/Course";
import Viewcourse from "./components/Admin/Course/Viewcourse.js";
import Editcourse from "./components/Admin/Course/Editcourse";
import Navpage from './components/User/Homepage/Navpage';
import Enrollcourse from './components/User/Homepage/Enrollcourse';
import Viewacademy from './components/User/Homepage/Viewacademy';
// import Course from './components/User/Homepage/Course';
import Adminstudent from './components/Admin/Adminstudent';
import './App.css';
>>>>>>> 8b67993 (merging to my branch)

function App() {
  
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login"element={<Login />} />

        <Route path="/Firstpage" element={<LandingPage/>} />
        <Route path="/admin/dashboard" element={<InstitutePage /> }/>
        <Route path="/admin/addInstitute" element={<AddInstitute/> }/>
        <Route path="/admin/editInstitute/:id" element={<EditInstitute/>}/>

        <Route path="/admin/addCourse" element={<AddCourse />} />
        <Route path="/admin/viewCourse" element={<CoursePage/>}/>
        <Route path="/admin/editCourse/:id" element={<EditCourse />} />

        <Route path="/admin/Viewstudent" element={<StudentPage />} />
        <Route path="/admin/addStudent" element={ <AddStudent />}/>
        <Route path="/admin/editStudent/:id" element={<EditStudent/>}/>

        <Route path="/admin/FeedBack" element={<AdminReviewPage/>}/> 
        <Route path="/admin/approveUser" element={<ApproveUser/>}/> 

        <Route path="/Navpage"  element={<UserLandingPage/>} />
        <Route path="/HomePage" element={<UserInstitutePage />} />
        <Route path="/UserCourse" element={<UserCoursePage />} />
        <Route path="/ApplyForm/:courseId" element={<CourseApplyForm />} />
        <Route path="/Enrolledcourse" element={<EnrolledCoursePage/>}/>
        <Route path="/FeedBack" element={<UserFeedbackPage/>}/>
        <Route path="/Admissionmodelpage" element={<CourseAppliedView/>} />
        <Route path="/Updatepage/:id" element={<CourseApplyEdit/>}/>
        <Route path="*" element={<>404 no such page go to home page</>} />
=======
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to={redirectPath} />} />
        <Route path="/login"element={!user ? <Login /> : <Navigate to={redirectPath} />} />
        <Route path="/" element={!user ? <Login /> : <Navigate to={redirectPath} />} />
        <Route path="/admin/dashboard" element={!user ? (<Navigate to="/" />) :
            user.roles === "admin" ? (<AdminHomePage /> ) : ( <Navigate to="/user/dashboard" /> ) }/>
        <Route path="/user/dashboard" element={!user ? (<Navigate to="/" />) :
           user.roles === "admin" ? (<AdminHomePage />) : (<Navpage />)} />
        <Route path="/Enrollcourse" element={<Enrollcourse/>}/>
        <Route path="/Viewacademy" element={<Viewacademy/>}/>
        {/* <Route path="/Course" element={<Course/>}/> */}
        <Route path="*" element={<>404 no such page go to home page</>} />
        <Route path="/admin/addCourse" element={<Course />} />
          <Route path="/admin/viewCourse" element={<Viewcourse/>}/>
          <Route path="/admin/editCourse/:id" element={<Editcourse />} />
          <Route path="/admin/Viewstudent" element={<Adminstudent />} />
>>>>>>> 8b67993 (merging to my branch)
      </Routes>
    </Router>
  );
}

export default App;