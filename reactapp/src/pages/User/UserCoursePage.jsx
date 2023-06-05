import { UserGuard } from '../../AuthGuard/UserGuard'; 
import UserCourse from '../../components/User/UserCourse/UserCourse';

const UserCoursePage = () => {
    return (
    <>
      <UserGuard>
        <UserCourse />
      </UserGuard>
    </>
    )
}
export default UserCoursePage;