import './App.css';
import Signup from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Homepage from './components/User/Homepage/Homepage';

function App() {
  return (
    <>
      <p>/learn react/i</p>
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
