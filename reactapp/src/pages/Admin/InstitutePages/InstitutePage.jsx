import {AdminGuard} from '../../../AuthGuard/AdminGuard';
import AdminHomePage from '../../../components/Admin/AdminHomePage/AdminHomePage'

const InstitutePage = () => {
    return (
    <>
      <AdminGuard>
        <AdminHomePage>
        </AdminHomePage>
      </AdminGuard>
    </>
    )
}
export default InstitutePage;