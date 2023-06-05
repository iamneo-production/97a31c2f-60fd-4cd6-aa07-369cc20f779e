import { UserGuard } from '../../AuthGuard/UserGuard'; 
import Review from '../../components/User/Review/Review';

const UserFeedbackPage = () => {
    return (
    <>
      <UserGuard>
        <Review />
      </UserGuard>
    </>
    )
}
export default UserFeedbackPage;