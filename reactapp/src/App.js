import { BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom';
import { UseAuthContext } from './hooks/UseAuthContext';
import Signup from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
import AdminHomePage from './components/Admin/AdminHomePage/AdminHomePage';
import UserCourse from './components/User/HomePage/UserCourse';
import Navpage from './components/User/HomePage/Navpage';
import Enrollcourse from './components/User/HomePage/Enrollcourse';
import Viewacademy from './components/User/HomePage/Viewacademy';
import './App.css';
import Enrolledcourse from './components/User/Enrolledcourse';
import Course from './components/Admin/Course/Course';
import Viewcourse from './components/Admin/Course/Viewcourse';
import Editcourse from './components/Admin/Course/Editcourse';
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
        <Route path="/Enrollcourse" element={!user ? <Navigate to="/" /> :<Enrollcourse/>}/>
        <Route path="/Viewacademy" element={!user ? <Navigate to="/" /> :<Viewacademy/>}/>
        <Route path="/UserCourse" element={!user ? <Navigate to="/" /> :<UserCourse/>}/>
        <Route path="/Enrolledcourse" element={!user? <Navigate to="/" /> :<Enrolledcourse/>}/>
        <Route path="*" element={<>404 no such page go to home page</>} />
        <Route path="/admin/addCourse" element={!user ? <Navigate to="/" />:<Course />} /> 
        <Route path="/admin/viewCourse" element={!user ? <Navigate to="/" />:<Viewcourse/>}/>
         <Route path="/admin/editCourse/:id" element={!user ? <Navigate to="/" />:<Editcourse />} />
      </Routes>
    </Router>
  );
}
export default App;