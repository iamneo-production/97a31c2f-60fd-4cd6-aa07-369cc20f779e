import logo from './logo.svg';
import './App.css';
import Login from './components/Auth/Login/Login';
import Signup from './components/Auth/Signup/Signup';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Userpage from './components/User/Homepage/Userpage';
import Adminpage from './components/User/Homepage/Adminpage';


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