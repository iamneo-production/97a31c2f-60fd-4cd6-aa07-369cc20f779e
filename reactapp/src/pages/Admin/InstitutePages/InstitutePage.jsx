import {AdminGuard} from '../../../AuthGuard/AdminGuard';
import AdminHomePage from '../../../components/Admin/AdminHomePage/AdminHomePage'
<<<<<<< HEAD
=======
import Navbar from '../../../components/Admin/Navbar/Navbar'

>>>>>>> f22cb4aa351f0e9bea9199623809ffbd40f673c6

const InstitutePage = () => {
    return (
    <>
      <AdminGuard>
<<<<<<< HEAD
=======
        <Navbar />
>>>>>>> f22cb4aa351f0e9bea9199623809ffbd40f673c6
        <AdminHomePage>
        </AdminHomePage>
      </AdminGuard>
    </>
    )
}
export default InstitutePage;