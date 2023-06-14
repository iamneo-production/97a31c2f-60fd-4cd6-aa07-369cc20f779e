import {AdminGuard} from '../../../AuthGuard/AdminGuard';
import AdminHomePage from '../../../components/Admin/AdminHomePage/AdminHomePage'
import Navbar from '../../../components/Admin/Navbar/Navbar'


const InstitutePage = () => {
    return (
    <>
      <AdminGuard>
        <Navbar />
        <AdminHomePage>
        </AdminHomePage>
      </AdminGuard>
    </>
    )
}
export default InstitutePage;