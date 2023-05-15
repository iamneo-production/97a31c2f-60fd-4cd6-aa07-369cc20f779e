
import './EnrolledCourse.css'
import {store} from '../../store';
import {useNavigate,Link} from 'react-router-dom';
import {useState,useEffect} from 'react';
import Studentservice from '../../api/Studentservice';


function Admissionmodelpage({studentIdNumber}){
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate('/EnrolledCourse');
    }

    const handleLogout = () => { 
        store.dispatch({ type: 'LOGOUT' })
        navigate('/login');
      }
    const [student,setstudent]=useState(null);
    const [formvalues,setformvalues]=useState({
        firstName : '',
        lastName : '',
        fatherName :'',
        motherName : '',
        phoneNumber1:'',
    });
    useEffect(()=>{
        const fetchstud=async()=>{
            const studentdata=await Studentservice.getStudent(studentIdNumber);
            setstudent(studentdata);
            setformvalues({
                firstName:studentdata.firstName,
                lastName:studentdata.lastName,
                fatherName:studentdata.fatherName,
                motherName:studentdata.motherName,
                phoneNumber1:studentdata.phoneNumber1
            });
        };
        fetchstud();
    },[studentIdNumber]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const updateddata = {
          firtName: formvalues.firstName,
          lastName:formvalues.lastName,
          fatherName:formvalues.fatherName,
          motherName: formvalues.motherName,
          phoneNumber1: formvalues.phoneNumber1,
        };
        await Studentservice.Updatestudent(studentIdNumber, updateddata);
    };
    const handleChange=(event)=>{
        const {name,value}=event.target;
        setformvalues({...formvalues,[name]:value});
    };
    if(!student){
        return<div>Loading..</div>
    }
    
    return(
        <div>
        <div>
            <h2>Student Details</h2>
            <p> First Name:{student.firstName}</p>
            <p> Last Name:{student.lastName}</p>
            <p>Father Name:{student.fatherName}</p>
            <p>Mother Name:{student.motherName}</p>
            <p>Phone Number:{student.phoneNumber1}</p>
            <form onSubmit={handleSubmit}>
                {[
                    {label:'First Name',firstName:'firstName',type:'text'},
                    {label:'Last Name',lastName:'lastName',type:'text'},
                    {label:'Father Name',lastName:'fatherName',type:'text'},
                    {label:'Mother Name',lastName:'motherName',type:'text'},
                    {label:'Phone Number',lastName:'phoneNumber1',type:'text'},
                ].map((field)=>(
                    <div key={field.firstName}>
                    <label htmlFor={field.firstName}>{field.label}</label>
                    <input>
                    type={field.type}
                    firstName={field.firstName}
                    value={formvalues[field.firstName]}
                    onChange{handleChange}
                    </input>
                </div>
                )
                )}
                <button type='submit'></button>
            </form>
        </div>
    <div className='navbar'>
     <div className='middle'>
     <Link to="/Viewacademy"><button>Institute</button></Link>
     </div>
    <div className='middle'>
    <button onClick={handleClick}>EnrolledCourse</button>
    </div>
     <div className='middle'>
     <button  onClick={handleLogout}>LogOut</button>
     </div>
     </div>
     </div>

    );
    
}

export default Admissionmodelpage;