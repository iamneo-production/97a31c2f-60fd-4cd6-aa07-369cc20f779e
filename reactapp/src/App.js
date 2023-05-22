import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Signup from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
import AdminHomePage, { AcademyForm } from './components/Admin/AdminHomePage/AdminHomePage';
import User,{StudentForm} from './components/Admin/User/User';
import HomePage from './components/User/HomePage/HomePage';
import UserCourse from './components/User/UserCourse/UserCourse';
import ApplyForm from './components/User/ApplyForm/ApplyForm';
import Course from './components/Admin/Course/Course';
import Viewcourse from './components/Admin/Course/Viewcourse';
import Editcourse from './components/Admin/Course/Editcourse';
import EnrolledCourse from './components/User/EnrolledCourse';
import Navpage from './components/User/HomePage/Navpage';
import Firstpage from './components/Admin/AdminDashboard/Firstpage';
import Review from './components/User/Review/Review';
import Admissionmodelpage from './components/User/Admissionmodelpage';
import Updatepage from './components/User/Updatepage';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login"element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/Firstpage" element={<Firstpage/>}/>
        <Route path="/admin/dashboard" element={<AdminHomePage /> }/>
        <Route path="/admin/addInstitute" element={<AcademyForm type="ADD"/>}/>
        <Route path="/admin/editInstitute/:id" element={<AcademyForm type="EDIT"/>}/>
        <Route path="/admin/addCourse" element={<Course />} />
        <Route path="/admin/viewCourse" element={<Viewcourse/>}/>
        <Route path="/admin/editCourse/:id" element={<Editcourse />} />
        <Route path="/admin/Viewstudent" element={<User />} />
        <Route path="/admin/addStudent" element={<StudentForm type="ADD"/>}/>
        <Route path="/admin/editStudent/:id" element={<StudentForm type="EDIT"/>}/>        
        <Route path="/Navpage"  element={<Navpage/>} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/UserCourse" element={<UserCourse />} />
        <Route path="/ApplyForm/:courseId" element={<ApplyForm />} />
        <Route path="/Enrolledcourse" element={<EnrolledCourse/>}/>
        <Route path="/FeedBack" element={<Review/>}/>
        <Route path="/Admissionmodelpage" element={<Admissionmodelpage/>}></Route>
        <Route path="/Updatepage/:id" element={<Updatepage/>}/>
        <Route path="*" element={<>404 no such page go to home page</>} />
      </Routes>
    </Router>
  );
}

export default App;