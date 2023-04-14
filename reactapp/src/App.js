import logo from './logo.svg';
import './App.css';
import Login from './components/Auth/Login/Login';
import Signup from './components/Auth/Signup/Signup';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Homepage from './components/User/Homepage/Homepage';

function App() {
  return (
    <>
    <Router >
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login /> } />
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={ <Homepage/> } />

          </Routes>
    </Router>
    </>
  );
}

export default App;