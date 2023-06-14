import {AdminGuard} from '../../AuthGuard/AdminGuard';
import Review from '../../components/Admin/Review/Review';

const AdminReviewPage = () => {
    return (
    <>
      <AdminGuard>
        <Review/>
      </AdminGuard>
    </>
    )
}
export default AdminReviewPage;