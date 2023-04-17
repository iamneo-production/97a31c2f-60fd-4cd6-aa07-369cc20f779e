import './App.css';
import Signup from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import AdminHomePage from './components/Admin/AdminHomePage/AdminHomePage';
import Homepage from './components/User/Homepage/Homepage';

function App() {
  return (
    <>
    <Router >
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login /> } />
            <Route path="/" element={<Login />} />
            <Route path="/user/dashboard" element={ <Userpage/> } />
            <Route path="/admin/dashboard" element={ <Adminpage/> } />
            {/* <Route path="/admin/institute/" element={ <Institutepage/> } /> */}


          </Routes>
    </Router>
    </>
  );
}

export default App;