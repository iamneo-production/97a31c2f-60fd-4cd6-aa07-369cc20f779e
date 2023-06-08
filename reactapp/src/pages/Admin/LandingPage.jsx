import {AdminGuard} from '../../AuthGuard/AdminGuard';
import Firstpage from '../../components/Admin/AdminDashboard/Firstpage'

const LandingPage = () => {
    return (
    <>
      <AdminGuard>
        <Firstpage/>
      </AdminGuard>
    </>
    )
}
export default LandingPage;