import {AdminGuard} from '../../../AuthGuard/AdminGuard';
import { AcademyForm } from '../../../components/Admin/AdminHomePage/AdminHomePage'

const EditInstitute = () => {
    return (
    <>
      <AdminGuard>
        <AcademyForm type={"EDIT"} />
      </AdminGuard>
    </>
    )
}
export default EditInstitute;