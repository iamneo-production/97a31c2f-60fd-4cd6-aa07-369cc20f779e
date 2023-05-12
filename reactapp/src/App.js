import { BrowserRouter as Router,Route,Routes, MemoryRouter } from 'react-router-dom';
import Signup from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
import AdminHomePage, { AcademyForm } from './components/Admin/AdminHomePage/AdminHomePage';
import AdminStudent from './components/Admin/AdminStudent/AdminStudent';
import Viewacademy from './components/User/HomePage/Viewacademy';
import UserCourse from './components/User/HomePage/UserCourse';
import Enrollcourse from './components/User/HomePage/Enrollcourse';
import Course from './components/Admin/Course/Course';
import Viewcourse from './components/Admin/Course/Viewcourse';
import Editcourse from './components/Admin/Course/Editcourse';
import EnrolledCourse from './components/User/EnrolledCourse';
import Review from './components/User/Review/Review';


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login"element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminHomePage /> }/>
        <Route path="/admin/addInstitute" element={<AcademyForm type="ADD"/>}/>
        <Route path="/admin/editInstitute/:id" element={<AcademyForm type="EDIT"/>}/>
        <Route path="/admin/addCourse" element={<Course />} />
        <Route path="/admin/viewCourse" element={<Viewcourse/>}/>
        <Route path="/admin/editCourse/:id" element={<Editcourse />} />
        <Route path="/admin/Viewstudent" element={<AdminStudent />} />
        <Route path="/Viewacademy" element={<Viewacademy />} />
        <Route path="/UserCourse" element={<UserCourse />} />
        <Route path="/Enrollcourse/:courseId" element={<Enrollcourse />} />
        <Route path="/Enrolledcourse" element={<EnrolledCourse/>}/>
        <Route path="/FeedBack" element={<Review/>}/>
        <Route path="*" element={<>404 no such page go to home page</>} />
      </Routes>
    </Router>
  );
}
export default App;