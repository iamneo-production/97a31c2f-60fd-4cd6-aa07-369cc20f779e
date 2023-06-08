import {AdminGuard} from '../../../AuthGuard/AdminGuard';
import Course from '../../../components/Admin/Course/Course';

const AddCourse = () => {
    return (
        <>
           <AdminGuard>
              <Course />
           </AdminGuard>
        </>
    )
}

export default AddCourse;