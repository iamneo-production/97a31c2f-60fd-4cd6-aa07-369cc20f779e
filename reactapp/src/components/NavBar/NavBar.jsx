import React,{ useState } from 'react'
import { HiMenuAlt1 } from 'react-icons/hi'
import { Link, useNavigate,useLocation } from 'react-router-dom';
import  { store } from "../../store"

const Navbar = () => {
    const [isActive, setisActive] = useState(false)
    const navigate = useNavigate();

    const logout = () => { 
        store.dispatch({ type: 'LOGOUT' })
        navigate('/login');
    }

    const location = useLocation().pathname;

    return (
        <>
            <div className='h-14 text-white  bg-[#2A7230]'>
                <div className='flex justify-between px-6 lg:px-20 py-2 items-center'>
                    <div className='text-2xl font-bold'>
                        PG Admission
                    </div>
                    <div >
                        <HiMenuAlt1 className='text-3xl block lg:hidden ' onClick={()=> setisActive(!isActive) }/>
                        <ul className=' space-x-4 text-2xl font-semibold hidden lg:flex'>
                           <Link id="adminInstitute" to="/admin/dashboard" className={location === "/admin/dashboard" ? "cursor-pointer text-red-600 text-3xl" : 'hover:text-red-500 cursor-pointer' } >Institutes</Link> 
                           <Link id="adminCourse" to="/admin/viewCourse" className={location === "/admin/viewCourse" ? "cursor-pointer text-red-600" : 'hover:text-red-500 cursor-pointer' } >Courses</Link> 
                           <Link id="adminStudents" to="/admin/Viewstudent" className={location === "/admin/Viewstudent" ? "cursor-pointer text-red-600" : 'hover:text-red-500 cursor-pointer' } >Students</Link> 
                           <Link id="adminFeedback" to="/admin/FeedBack" className={location === "/admin/FeedBack" ? "cursor-pointer text-red-600" : 'hover:text-red-500 cursor-pointer' } >FeedBack</Link> 
                           <li className='hover:text-red-500 cursor-pointer' onClick={()=>logout()}>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {isActive &&
                <div className='bg-slate-300   w-11/12 z-10  lg:hidden h-60 absolute right-0 rounded-lg text-center'>
                    <ul className='pt-2 text-red-500   text-2xl font-semibold'> 
                           <div> <Link id="dminInstitute" to="/admin/dashboard" className="py-2" >Institutes</Link>  </div>
                           <div> <Link id="adminCourse" to="/admin/viewCourse" className="py-2" >Courses</Link>  </div>
                           <div> <Link id="adminStudents" to="/admin/Viewstudent" className="py-2" >Students</Link>  </div>
                           <div> <Link id="adminFeedback" to="/admin/FeedBack" className="py-2" >FeedBack</Link>  </div>
                           <div> <li className='hover:text-red-500 cursor-pointer' onClick={()=>logout()}>Logout</li> </div>
                    </ul>
                </div>
            }
            
        </>
  )
}

export default Navbar