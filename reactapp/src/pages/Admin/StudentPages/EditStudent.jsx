import {AdminGuard} from '../../../AuthGuard/AdminGuard';
import {StudentForm} from '../../../components/Admin/User/User';

const EditStudent = () => {
    return (
        <>
           <AdminGuard>
                <StudentForm type="EDIT"/>
           </AdminGuard>
        </>
    )
}

export default EditStudent;