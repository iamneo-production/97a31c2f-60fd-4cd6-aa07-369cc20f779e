import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Signup from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
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

function App() {
  
  return (
    <Router>
      <Routes>
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
      </Routes>
    </Router>
  );
}

export default App;