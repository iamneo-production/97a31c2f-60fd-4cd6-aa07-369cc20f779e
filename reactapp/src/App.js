import { BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom';
import { UseAuthContext } from './hooks/UseAuthContext';
import Signup from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
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

function App() {
  const { user } = UseAuthContext()

  let redirectPath = "";
  if (!user) {
    redirectPath = "/";
  } else if (user.roles === "admin") {
    redirectPath = "/admin/dashboard";
  } else {
    redirectPath = "/user/dashboard";
  }

  return (
    <Router>
      <Routes>
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
        <Route path="/admin/addCourse" element={!user ? <Navigate to="/" />:<Course />} />
          <Route path="/admin/viewCourse" element={!user ? <Navigate to="/" />:<Viewcourse/>}/>
          <Route path="/admin/editCourse/:id" element={!user ? <Navigate to="/" />:<Editcourse />} />
          <Route path="/admin/Viewstudent" element={<Adminstudent />} />
      </Routes>
    </Router>
  );
}
export default App;