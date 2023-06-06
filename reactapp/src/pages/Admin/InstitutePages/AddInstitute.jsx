import {AdminGuard} from '../../../AuthGuard/AdminGuard';
import { AcademyForm } from '../../../components/Admin/AdminHomePage/AdminHomePage'

const AddInstitute = () => {
    return (
    <>
      <AdminGuard>
        <AcademyForm type={"ADD"} />
      </AdminGuard>
    </>
    )
}
export default AddInstitute;