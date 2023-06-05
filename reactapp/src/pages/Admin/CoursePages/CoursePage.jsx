import {AdminGuard} from '../../../AuthGuard/AdminGuard';
import Viewcourse from '../../../components/Admin/Course/Viewcourse'

const CoursePage = () => {
    return (
        <>
           <AdminGuard>
              <Viewcourse />
           </AdminGuard>
        </>
    )
}

export default CoursePage;