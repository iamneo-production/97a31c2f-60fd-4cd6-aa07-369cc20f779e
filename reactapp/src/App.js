import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Signup from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
import AdminHomePage, { AcademyForm } from './components/Admin/AdminHomePage/AdminHomePage';
import Adminstudent from './components/Admin/Adminstudent';
import Viewacademy from './components/User/HomePage/Viewacademy'
import UserCourse from './components/User/HomePage/UserCourse'
import Enrollcourse from './components/User/HomePage/Enrollcourse'
import Course from './components/Admin/Course/Course'
import Viewcourse from './components/Admin/Course/Viewcourse'
import Editcourse from './components/Admin/Course/Editcourse'
import Enrolledcourse from './components/User/Enrolledcourse';

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
        <Route path="/admin/Viewstudent" element={<Adminstudent />} />
        <Route path="/Viewacademy" element={<Viewacademy />} />
        <Route path="/UserCourse" element={<UserCourse />} />
        <Route path="/Enrollcourse" element={<Enrollcourse />} />
        <Route path="/Enrolledcourse" element={<Enrolledcourse/>}/>
        <Route path="*" element={<>404 no such page go to home page</>} />
      </Routes>
    </Router>
  );
}
export default App;