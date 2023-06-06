import {AdminGuard} from '../../../AuthGuard/AdminGuard';
import Editcourse from '../../../components/Admin/Course/Editcourse';

const EditCourse = () => {
    return (
        <>
           <AdminGuard>
              <Editcourse/>
           </AdminGuard>
        </>
    )
}

export default EditCourse;