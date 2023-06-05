import {AdminGuard} from '../../../AuthGuard/AdminGuard';
import User from "../../../components/Admin/User/User"

const StudentPage = () => {
    return (
        <>
           <AdminGuard>
              <User />
           </AdminGuard>
        </>
    )
}

export default StudentPage;