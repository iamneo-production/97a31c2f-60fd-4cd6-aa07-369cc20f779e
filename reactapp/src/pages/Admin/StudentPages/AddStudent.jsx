import {AdminGuard} from '../../../AuthGuard/AdminGuard';
import {StudentForm} from '../../../components/Admin/User/User';

const AddStudent = () => {
    return (
        <>
           <AdminGuard>
                <StudentForm type="ADD"/>
           </AdminGuard>
        </>
    )
}

export default AddStudent;